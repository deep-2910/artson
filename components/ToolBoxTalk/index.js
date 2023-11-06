import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Input,
} from "@mui/material";
import CustomTextField from "../../components/common/CustomTextField";
import artsonLogo from "../../assets/images/artson-image.png";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import GlobalLoader from "../common/GlobalLoader";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FilePopup from "../FilePopup";
import Visibility from "@mui/icons-material/Visibility";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ViewReport() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    project: "",
    location: "",
    date: "",
    companyname: "",
    workpermitno: "",
    todayactivities: "",
    hazardsassociated: "",
    controlmeasures: "",
    inductiongivenby: "",
    time: "",
    signatureofhse: "",
    signatureofengineer: "",
  });

  const initialRow = {
    name: "",
    company: "",
    age: "",
    designation: "",
    signature: "",
  };
  function generateRandomID() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "AEL/FRM/HSE/";
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    return id;
  }
  const [tableData, setTableData] = useState([initialRow]);
  const [dob, setDob] = useState(null);
  const [time, setTime] = useState(null);
  const [documentId, setDocumentId] = useState(generateRandomID());
  const [loaderFlag, setLoaderFlag] = useState(true);
  const [files, setFiles] = useState([null, null, null, null, null]);
  const [errorMessage, setErrorMessage] = useState("");
  const [filePopupFlag, setFilePopupFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const pdfRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      setLoaderFlag(false);
    }, 1000);
  }, []);

  const addRow = () => {
    setTableData([...tableData, { ...initialRow }]);
  };

  const deleteRow = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleInfo = (index) => {
    setOpen(true);
    setFilePopupFlag(true);
    setUrl(files[index].url);
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleFileChange = (e, columnIndex) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 1024 * 1024) {
        const newFiles = [...files];
        const imageUrl = URL.createObjectURL(file);
        newFiles[columnIndex] = {
          file,
          name: file.name,
          url: imageUrl,
        };
        setFiles(newFiles);
        setErrorMessage("");
      } else {
        setErrorMessage("File size should be less than 1 MB");
        e.target.value = null;
      }
    }
  };

  const handleDownload = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      // const pdf=new jsPDF('p', 'mm','a4',true);
      const pdf = new jsPDF("p", "pt", "letter");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const Ratio = Math.min(pdfWidth / imgWidth, pdfHeight / pdfHeight);
      const imgX = (pdfWidth - imgWidth * Ratio) / 2;
      const imgY = 0;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * Ratio,
        imgHeight * Ratio
      );
      pdf.save("Document.pdf");
    });
  };

  const handleCreateNew = () => {
    setLoaderFlag(true);
    const randomID = generateRandomID();
    setDocumentId(randomID);
    setTableData([initialRow]);
    setTime(null);
    setDob(null);
    setFormData({
      project: "",
      date: "",
      inductionRecord: "",
      noofPersonsInducted: "",
      inductiongivenby: "",
      time: "",
      signature: "",
      signatureofhse: "",
      sitelocation: "",
      subContractorName: "",
      incidentDate: "",
      incidentTime: "",
      personsInvolved: "",
      exactLocation: "",
      typeOfWork: "",
      describeWhatHappened: "",
      analysisHappened: "",
      immediateActionTaken: "",
      recomendedFutureAction: "",
      positiveObservation: "",
    });
    setTimeout(() => {
      setLoaderFlag(false);
    }, 1000);
  };

  return (
    <div className="container" ref={pdfRef}>
      <Typography
        variant="h5"
        align="center"
        style={{ margin: "0 auto", marginBottom: "2rem", fontSize: "1.8rem" }}
      >
        TOOLBOX TALK
      </Typography>
      {loaderFlag ? (
        <GlobalLoader />
      ) : (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TableContainer component={Paper}>
            <Table style={{ borderCollapse: "collapse" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={10}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    <img
                      alt="Kotak Logo"
                      className="logo-size"
                      src={artsonLogo.src}
                    />
                    <Typography variant="h6" align="center">
                      ARTSON ENGINEERING LIMITED
                    </Typography>
                    <Typography variant="h6" align="center">
                      TOOL BOX TALK / HIRA TALK
                    </Typography>
                    <Typography variant="body1" align="center">
                      (A Subsidiary of TATA PROJECTS LIMITED)
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={12}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {isEditing ? (
                      <CustomTextField
                        type="text"
                        id="project"
                        name="project"
                        label="Project"
                        value={formData.project || ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^[A-Za-z\s]*$/.test(inputValue)) {
                            setFormData({
                              ...formData,
                              project: e.target.value,
                            });
                          }
                        }}
                      />
                    ) : (
                      <Typography variant="body1">
                        Project: {formData.project}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={6}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {isEditing ? (
                      <CustomTextField
                        type="text"
                        id="location"
                        name="location"
                        label="Site/Location"
                        value={formData.location || ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^[A-Za-z]*$/.test(inputValue)) {
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            });
                          }
                        }}
                      />
                    ) : (
                      <Typography variant="body1">
                        Location: {formData.location}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {isEditing ? (
                      <DesktopDatePicker
                        type="text"
                        id="date"
                        name="date"
                        label="Date"
                        inputFormat="MM/DD/YYYY"
                        value={dob || ""}
                        onChange={(date) => {
                          let dateObj = new Date(date);
                          let dateCheck =
                            dateObj.getMonth() +
                            1 +
                            "/" +
                            dateObj.getDate() +
                            "/" +
                            dateObj.getFullYear();
                          setFormData({
                            ...formData,
                            date: dayjs(dateCheck).format("MM/DD/YYYY"),
                          });
                          setDob(date);
                        }}
                        renderInput={(params) => (
                          <CustomTextField
                            variant="standard"
                            value={dob}
                            fullWidth
                            {...params}
                          />
                        )}
                      />
                    ) : (
                      <Typography variant="body1">
                        Date: {formData.date}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {isEditing ? (
                      <TimePicker
                        type="text"
                        id="time"
                        name="time"
                        label="Select Time"
                        value={time}
                        onChange={(time) => setTime(time)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    ) : (
                      <Typography variant="body1">
                        Time: {time ? time.format("HH:mm A") : ""}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={6}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {isEditing ? (
                      <CustomTextField
                        type="text"
                        id="companyname"
                        name="companyname"
                        label="Company Name:"
                        value={formData.companyname || ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^[A-Za-z\s]*$/.test(inputValue)) {
                            setFormData({
                              ...formData,
                              companyname: e.target.value,
                            });
                          }
                        }}
                      />
                    ) : (
                      <Typography variant="body1">
                        Company Name: {formData.companyname}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell
                    colSpan={5}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {isEditing ? (
                      <CustomTextField
                        type="text"
                        id="workpermitno"
                        name="workpermitno"
                        label="Work Permit No"
                        value={formData.workpermitno || ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^[0-9]*$/.test(inputValue)) {
                            setFormData({
                              ...formData,
                              workpermitno: e.target.value,
                            });
                          }
                        }}
                      />
                    ) : (
                      <Typography variant="body1">
                        Work Permit No: {formData.workpermitno}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={6}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {isEditing ? (
                      <CustomTextField
                        type="text"
                        id="todayactivities"
                        name="todayactivities"
                        label="Today’s Activities:"
                        value={formData.todayactivities || ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^[A-Za-z\s]*$/.test(inputValue)) {
                            setFormData({
                              ...formData,
                              todayactivities: e.target.value,
                            });
                          }
                        }}
                      />
                    ) : (
                      <Typography variant="body1">
                        Today’s Activities: {formData.todayactivities}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell
                    colSpan={5}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {isEditing ? (
                      <CustomTextField
                        type="text"
                        id="totalmanpower"
                        name="totalmanpower"
                        label="Total Man Power"
                        value={formData.totalmanpower || ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^[A-Za-z0-9\s]*$/.test(inputValue)) {
                            setFormData({
                              ...formData,
                              totalmanpower: e.target.value,
                            });
                          }
                        }}
                      />
                    ) : (
                      <Typography variant="body1">
                        Total Man Power: {formData.totalmanpower}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={4}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {isEditing ? (
                      <CustomTextField
                        type="text"
                        id="hazardsassociated"
                        name="hazardsassociated"
                        label="Hazards Associated with Activities"
                        value={formData.hazardsassociated || ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^[A-Za-z\s]*$/.test(inputValue)) {
                            setFormData({
                              ...formData,
                              hazardsassociated: e.target.value,
                            });
                          }
                        }}
                      />
                    ) : (
                      <Typography variant="body1">
                        Hazards Associated with Activities :{" "}
                        {formData.hazardsassociated}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell
                    colSpan={6}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {isEditing ? (
                      <CustomTextField
                        type="text"
                        id="controlmeasures"
                        name="controlmeasures"
                        label="Control Measures Explained"
                        value={formData.controlmeasures || ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^[A-Za-z\s]*$/.test(inputValue)) {
                            setFormData({
                              ...formData,
                              controlmeasures: e.target.value,
                            });
                          }
                        }}
                      />
                    ) : (
                      <Typography variant="body1">
                        Control Measures Explained: {formData.controlmeasures}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={12}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    <Typography variant="body1">
                      Hazards associated with the job and their control &
                      preventive measures have been explained to my
                      understanding:
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={20}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              S No.
                            </TableCell>
                            <TableCell
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Name of the Person
                            </TableCell>
                            <TableCell
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Designation
                            </TableCell>
                            <TableCell
                              style={{
                                border: "1px solid #000",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              Signature
                            </TableCell>
                            {isEditing && (
                              <TableCell
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                Action
                              </TableCell>
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tableData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {isEditing ? (
                                  <Input
                                    type="text"
                                    value={row.name}
                                    onChange={(e) => {
                                      const inputValue = e.target.value;
                                      if (/^[A-Za-z\s]*$/.test(inputValue)) {
                                        const newData = [...tableData];
                                        newData[index].name = e.target.value;
                                        setTableData(newData);
                                      }
                                    }}
                                  />
                                ) : (
                                  row.name
                                )}
                              </TableCell>
                              <TableCell
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {isEditing ? (
                                  <Input
                                    type="text"
                                    value={row.designation}
                                    onChange={(e) => {
                                      const inputValue = e.target.value;
                                      if (/^[A-Za-z\s]*$/.test(inputValue)) {
                                        const newData = [...tableData];
                                        newData[index].designation =
                                          e.target.value;
                                        setTableData(newData);
                                      }
                                    }}
                                  />
                                ) : (
                                  row.designation
                                )}
                              </TableCell>
                              <TableCell
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "left",
                                }}
                              >
                                {isEditing ? (
                                  <Input
                                    type="text"
                                    value={row.signature}
                                    onChange={(e) => {
                                      const inputValue = e.target.value;
                                      if (/^[A-Za-z\s]*$/.test(inputValue)) {
                                        const newData = [...tableData];
                                        newData[index].signature =
                                          e.target.value;
                                        setTableData(newData);
                                      }
                                    }}
                                  />
                                ) : (
                                  row.signature
                                )}
                              </TableCell>
                              {isEditing && (
                                <TableCell
                                  style={{
                                    border: "1px solid #000",
                                    padding: "8px",
                                    textAlign: "left",
                                  }}
                                >
                                  <Button
                                    onClick={() => deleteRow(index)}
                                    variant="contained"
                                    style={{ backgroundColor: "#4B4B4B" }}
                                  >
                                    Delete
                                  </Button>
                                </TableCell>
                              )}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {isEditing && (
                      <Button
                        onClick={addRow}
                        variant="contained"
                        style={{ backgroundColor: "#4B4B4B" }}
                      >
                        Add Row
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={12}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Please Note:
                    <br />
                    1. After completion of TBT Engineer/supervisor will submit
                    Original copy to Site HSE Head/Officer.
                    <br />
                    2. All hazards associated with activities & control measures
                    to be explained to workmen as per HIRA guidelines.
                    <br />
                    3. No workman shall engage at site location without tool box
                    talk.
                    <br />
                    <div style={{ marginBottom: "3rem" }}></div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      {isEditing ? (
                        <CustomTextField
                          type="text"
                          id="signatureofengineer"
                          name="signatureofengineer"
                          label="SignatureofEngineer"
                          value={formData.signatureofengineer || ""}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^[A-Za-z\s]*$/.test(inputValue)) {
                              setFormData({
                                ...formData,
                                signatureofengineer: e.target.value,
                              });
                            }
                          }}
                        />
                      ) : (
                        <Typography variant="body1">
                          Name & Signature of Engineer/Supervisor:{" "}
                          {formData.signatureofengineer}
                        </Typography>
                      )}
                      {isEditing ? (
                        <CustomTextField
                          type="text"
                          id="signatureofhse"
                          name="signatureofhse"
                          label="Signature"
                          value={formData.signatureofhse || ""}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^[A-Za-z\s]*$/.test(inputValue)) {
                              setFormData({
                                ...formData,
                                signatureofhse: e.target.value,
                              });
                            }
                          }}
                        />
                      ) : (
                        <Typography variant="body1">
                          Name & Signature of HSE Person:{" "}
                          {formData.signatureofhse}
                        </Typography>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={3}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    <Typography variant="body1">
                      Document No: {documentId}
                    </Typography>
                  </TableCell>
                  <TableCell
                    colSpan={3}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    <Typography variant="body1">
                      * THINK SAFE * ACT SAFE * BE SAFE *
                    </Typography>
                  </TableCell>
                  <TableCell
                    colSpan={3}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    <Typography variant="body1">
                      Revision No: 01 ; Date: 13/09//2023
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </LocalizationProvider>
      )}
      <div style={{ margin: "0 auto" }} className="documentContainer">
        {isEditing ? (
          <>
            <Typography variant="body1" className="add-attachements">
              Add Attachments
            </Typography>
            <Table>
              <TableBody>
                {errorMessage && (
                  <Typography variant="body2" color="error">
                    {errorMessage}
                  </Typography>
                )}
                <TableRow>
                  <div className="align-files">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <TableCell
                        key={index}
                        sx={{ padding: "0px", border: "none" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "12rem",
                          }}
                        >
                          <input
                            type="file"
                            accept=".jpg, .png"
                            style={{
                              borderRadius: "2px",
                              width: "200px",
                              display: "none",
                            }}
                            onChange={(e) => handleFileChange(e, index)}
                            id={`file-input-${index}`}
                          />
                          <label htmlFor={`file-input-${index}`}>
                            <Button
                              variant="contained"
                              className="chose-file-button"
                              component="span"
                              onChange={(e) => handleFileChange(e, index)}
                            >
                              Choose File
                            </Button>
                          </label>
                          {files[index] && (
                            <>
                              <IconButton
                                color="primary"
                                sx={{ padding: "0px" }}
                                onClick={() => handleDeleteFile(index)}
                              >
                                <DeleteIcon
                                  sx={{
                                    fontSize: "1rem",
                                    color: "#4B4B4B !important",
                                  }}
                                />
                              </IconButton>
                              <IconButton
                                color="primary"
                                onClick={() => handleInfo(index)}
                                sx={{ padding: "0px", marginLeft: "-10px" }}
                              >
                                <Visibility
                                  sx={{
                                    fontSize: "1rem",
                                    color: "#4B4B4B !important",
                                  }}
                                />
                              </IconButton>
                              {filePopupFlag && (
                                <FilePopup
                                  open={open}
                                  setOpen={setOpen}
                                  url={url}
                                />
                              )}
                            </>
                          )}
                        </div>
                        {files[index]?.name ? (
                          <p className="file-name">{files[index].name}</p>
                        ) : (
                          <p>No File Choosen</p>
                        )}
                      </TableCell>
                    ))}
                  </div>
                </TableRow>
              </TableBody>
            </Table>
          </>
        ) : (
          <Box display="flex" className="align-files">
            {files &&
              files.length > 0 &&
              files.map((file, fileIndex) => (
                <div key={fileIndex} style={{ margin: "0 1rem" }}>
                  {file?.file?.name && (
                    <>
                      <img
                        src={file?.url}
                        alt="Uploaded"
                        style={{ width: "100px", height: "100px" }}
                      />
                      <p className="file-name">{`${fileIndex + 1}. ${
                        file?.file?.name
                      }`}</p>
                    </>
                  )}
                </div>
              ))}
          </Box>
        )}
      </div>

      <div style={{ margin: "0 auto" }} className="buttonContainer">
        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <Button
            variant="contained"
            onClick={handleCreateNew}
            className="submit-button"
          >
            Create New
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            className="submit-button"
            disabled={!isEditing}
          >
            Save
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdate}
            className="submit-button"
          >
            Edit
          </Button>
          <Button
            variant="contained"
            onClick={handleDownload}
            className="submit-button"
            disabled={isEditing}
          >
            Print
          </Button>
        </div>
      </div>
      <div className="searchButtonContainer">
        <div className="searchButton">
          <span>Search</span>
        </div>
        <Button
          variant="contained"
          onClick={handleUpdate}
          className="submit-button"
        >
          <svg
            className="MuiSvgIcon-root"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 12 12"
            width="12"
            height="12"
            data-testid="SearchIcon"
          >
            <path d="M4.95 0a4.99 4.99 0 0 1 4.102 7.78l3.722 3.723a.75.75 0 1 1-1.06 1.06l-3.723-3.722A4.99 4.99 0 1 1 4.95 0zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
          </svg>
        </Button>
      </div>
    </div>
  );
}

export default ViewReport;
