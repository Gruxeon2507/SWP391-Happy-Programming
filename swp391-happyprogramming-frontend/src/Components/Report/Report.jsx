import React, { useEffect, useState } from "react";
import ReportTypeServices from "../../services/ReportTypeServices";
import ReportServices from "../../services/ReportServices";

const Report = ({ commentId, username }) => {
  const [reportTypeId, setReportTypeId] = useState();
  const [input, setInput] = useState("");
  const [reportTypes, setReportTypes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  // get all report types
  useEffect(() => {
    ReportTypeServices.getAllReportTypes()
      .then((res) => {
        setReportTypes(res.data);
        console.log("RES: " + res.data.length);
      })
      .catch((error) => {
        console.log("ERROR GET ALL REPORT TYPES " + error);
      });
  }, []);

  const chooseReportType = (typeId) => {
    setReportTypeId(typeId);
    setShowForm(true);
  };

  const handleSubmitReport = () => {
    // e.preventDefault();
    console.log("pressing submit report...");
    // commentId, username, content, reportType
    const report = {
      comment: {
        commentId: commentId,
      },
      reportContent: input,
      reportType: {
        reportTypeId: reportTypeId,
      },
    };
    ReportServices.insertReport(report);
    console.log("end of handle submit report");
  };

  return (
    <>
      <form id="--rp-form" style={{ display: showForm ? "block" : "none" }}>
        Report Description:
        <input
          type="text"
          placeholder={"Tell us more..."}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => handleSubmitReport()}>Report</button>
      </form>
      {reportTypes.map((t) => (
        <div key={t.reportTypeId} className="rp-cate">
          <span>{t.reportName}</span>
          <span>{t.reportDescription}
            <ion-icon name="chevron-forward-outline"
              onClick={() => chooseReportType(t.reportTypeId)}
            ></ion-icon>
          </span>
          {/* <button onClick={() => chooseReportType(t.reportTypeId)}>
            {">"}
          </button> */}
        </div>
      ))}
    </>
  );
};
export default Report;
