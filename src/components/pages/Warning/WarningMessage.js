import api from "../../../utils/api";
import styles from "./WarningMessage.module.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMEssage";

function WarningMessage({
  toggleWarningMessage,
  btnText,
  warningMessage,
  sportId,
}) {
  const [token] = useState(localStorage.getItem("token") || "");
  const { deleteUserAccount } = useAuth();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  function warningMessageBtn(text) {
    switch (text) {
      case "Delete Account":
        deleteUserAccount();
        break;
      case "Delete Activity":
        deleteActivity();
        break;
      case "Leave Activity":
        leaveActivity();
        break;
      // case "Remove Member":
      //   removeMember();
      //   break;
      default:
    }
  }

  async function deleteActivity() {
    let msgType = "success";

    const data = await api
      .delete(`/sport/delete/${sportId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
    navigate("/");
  }

  async function leaveActivity() {
    let msgType = "success";

    const data = await api
      .delete(`/sport/leavegroup/${sportId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
    navigate('/');
    
  }

  return (
    <section>
      <div className={styles.warning}>
        <button
          className={styles.close_warning}
          onClick={() => toggleWarningMessage(false)}
        >
          &times;
        </button>
        <h1 className={styles.warning_header}>Warning</h1>
        <div className={styles.message}>
          <p className={styles.message_p}>{warningMessage}</p>
        </div>
        <div className={styles.btns}>
          <button
            className={styles.btn1}
            onClick={() => toggleWarningMessage(false)}
          >
            Cancel
          </button>
          <button
            className={styles.btn2}
            onClick={() => warningMessageBtn(btnText)}
          >
            {btnText}
          </button>
        </div>
      </div>
      <div
        className={styles.overlay}
        onClick={() => toggleWarningMessage(false)}
      ></div>
    </section>
  );
}

export default WarningMessage;
