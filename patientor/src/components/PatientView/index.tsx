import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../../constants";
import { Patient } from "../../types";

const PatientView = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const getData = async () => {
      const patient = await axios.get(`${apiBaseUrl}/patients/${id}`);
      setPatient(patient.data);
    };
  }, [id]);
  return <div>PatientView</div>;
};

export default PatientView;
