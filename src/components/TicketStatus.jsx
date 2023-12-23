import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { FcOk } from "react-icons/fc";
import { FcPieChart } from "react-icons/fc";
import { FaRegCircle } from "react-icons/fa";

const TicketStatus = () => {
  const iconWrapperStyle = {
    display: "flex",
    alignItems: "center",
    marginRight: "10rem",
  };

  const statusStyle = {
    marginRight: "0.5rem",
  };

  return (
    <div className="container-main flex">
      {/* Backlog */}
      <div className="icon-wrapper" style={iconWrapperStyle}>
        <FaRegCircle style={statusStyle} />
        <span className="status" style={statusStyle}>
          Backlog
        </span>
        <span style={{ color: "gray" }}>2</span>
      </div>

      <div className="icon-wrapper" style={iconWrapperStyle}>
        <AiOutlinePlus size={15} style={{ marginRight: "5px" }} />
        <BsThreeDots size={15} style={{ marginRight: "15px" }} />
        <FaRegCircle style={statusStyle} />
        <span className="status" style={statusStyle}>
          Todo
        </span>
        <span style={{ color: "gray" }}>3</span>
      </div>

      <div className="icon-wrapper" style={iconWrapperStyle}>
        <AiOutlinePlus size={15} style={{ marginRight: "5px" }} />
        <BsThreeDots size={15} style={{ marginRight: "15px" }} />
        <FcPieChart style={statusStyle} />
        <span className="status" style={statusStyle}>
          In Progress
        </span>
        <span style={{ color: "gray" }}>5</span>
      </div>

      <div className="icon-wrapper" style={iconWrapperStyle}>
        <AiOutlinePlus size={15} style={{ marginRight: "5px" }} />
        <BsThreeDots size={15} style={{ marginRight: "15px" }} />
        <FcOk style={statusStyle} />
        <span className="status" style={statusStyle}>
          Done
        </span>
        <span style={{ color: "gray" }}>0</span>
      </div>

      <div
        className="icon-wrapper"
        style={{ ...iconWrapperStyle, marginLeft: "2rem" }}
      >
        <AiOutlinePlus size={15} style={{ marginRight: "5px" }} />
        <BsThreeDots size={15} style={{ marginRight: "15px" }} />
        <MdCancel style={statusStyle} />
        <div>
          <span className="status" style={statusStyle}>
            Cancelled
          </span>
          <span style={{ color: "gray" }}>0</span>
        </div>
      </div>
    </div>
  );
};

export default TicketStatus;
