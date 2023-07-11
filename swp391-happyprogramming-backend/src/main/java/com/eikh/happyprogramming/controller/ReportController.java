package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.*;
import com.eikh.happyprogramming.modelkey.ReportKey;
import com.eikh.happyprogramming.repository.*;
import com.eikh.happyprogramming.services.ReportServices;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    CommentRepository commentRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ParticipateRepository participateRepository;

    @Autowired
    CourseRepository courseRepository;
    @Autowired
    JwtTokenFilter jwtTokenFilter;

    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Autowired
    ReportServices reportServices;

    @Autowired
    ReportRepository reportRepository;

    @GetMapping("/")
    public List<Report> getAllReports() {
        List<Report> reports = reportServices.getAllReports();
        for (Report r : reports) {
//            System.out.println("OBJ: " + r.g);
        }
        return reportServices.getAllReports();
    }

    @GetMapping("/find/by-username/{username}")
    public List<Report> getReportsToUser(@PathVariable("username") String username) {
        return reportRepository.findAllByComment_User_Username(username);
    }

    @GetMapping("/count/by-username/{username}")
    public int countReportsToUser(@PathVariable("username") String username) {
        return reportRepository.countAllByComment_User_Username(username);
    }

    @PostMapping("/create")
    public void createReport(@RequestBody Report report, HttpServletRequest request) {
        // check permission: user attends the course
        String username = jwtTokenUtil.getUsernameFromToken((jwtTokenFilter.getJwtFromRequest(request)));
        Course c = courseRepository.findByPosts_Comments_CommentId(report.getComment().getCommentId());
        Participate p = participateRepository.getUserParticipateFromCourse(username, c.getCourseId());
        if (p == null) {
            return;
        }
        java.util.Date now = new java.util.Date();
        report.setReportTime(new Timestamp(System.currentTimeMillis()));
        User u = new User();
        u.setUsername(username);
        report.setUser(u);
        ReportKey k = new ReportKey();
        k.setReportedBy(username);
        k.setCommentId(report.getComment().getCommentId());
        report.setReportKey(k);
        System.out.println("Comment Id: " + report.getComment().getCommentId());
        System.out.println("Report Type: " + report.getReportType().getReportTypeId());
        System.out.println("Content: " + report.getReportContent());
        System.out.println("Reported By: " + report.getUser().getUsername());
        reportRepository.save(report);
        Comment cmt = commentRepository.findById(report.getComment().getCommentId()).orElse(null);
        if (cmt != null) {
            banMentee(cmt.getUser().getUsername());
        } else {
            System.out.println("cmt is null");
        }
    }

    public void banMentee(String username) {
        System.out.println("calling ban mentee");
        // return if user is an active mentor of any course
        Participate p = participateRepository.findByUser_UsernameAndParticipateRole_ParticipateRoleAndStatus_StatusId(username, 2, 1);
        if (p != null) {
            return;
        }
        // count total report for given username
        int reportCount = reportRepository.countAllByComment_User_Username(username);
        System.out.println("no of report for " + username + ": " + reportCount);
        if (reportCount % 10 == 0) {
            System.out.println("banning");
            // ban mentee
            User u = userRepository.findByUsername(username);
            u.setActiveStatus(false);
            userRepository.save(u);
            System.out.println("banned ok");
        }
    }


}
