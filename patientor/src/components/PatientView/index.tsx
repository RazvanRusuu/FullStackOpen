import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../../constants";
import { Patient } from "../../types";

const PatientView = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const getPatientData = async () => {
      const patient = await axios.get(`${apiBaseUrl}/patients/${id}`);
      setPatient(patient.data);
    };

    getPatientData();
  }, [id]);

  console.log(patient);
  return (
    <div style={{ margin: "20px 0" }}>
      <h2>{patient?.name}</h2>
      <p>
        ssn: <span>{patient?.ssn}</span>
      </p>
      <p>
        occupation: <span>{patient?.occupation}</span>
      </p>
    </div>
  );
};

export default PatientView;
