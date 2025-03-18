import { useState } from "react";

function App() {
  //Data states
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("");
  const [netIncome, setNetIncome] = useState("");
  const [rent, setRent] = useState("");
  const [medicalInsurance, setMedicalInsurance] = useState("");
  const [familySupport, setFamilySupport] = useState("");
  const [privateClub, setPrivateClub] = useState("");
  //Functional states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClientForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:8080/client/`, {
      method: "POST",
      headers: {
        //Check Content-type if this is needed because it gave us trouble for image files
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        currency,
        netIncome,
        rent,
        medicalInsurance,
        familySupport,
        privateClub,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.log("Response is not OK!");
      setLoading(false);
      setError(data.message);
    }
    if (response.ok) {
      console.log("Response is OK!");
      setLoading(false);
      setName("");
      setCurrency("");
      setNetIncome("");
      setRent("");
      setMedicalInsurance("");
      setFamilySupport("");
      setPrivateClub("");
    }
  };

  return (
    <>
      <form
        className="flex flex-col border-2 border-amber-200 items-center text-center"
        onSubmit={handleClientForm}
      >
        <div className="flex flex-col">
          <label htmlFor="name">Type your name and last name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="currency">Select your type of currency:</label>
          <input
            type="text"
            name="currency"
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="netIncome">
            Select a monthly net income based on your salary:
          </label>
          <input
            type="text"
            name="netIncome"
            id="netIncome"
            value={netIncome}
            onChange={(e) => setNetIncome(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="rent">Do you pay rent?</label>
          <input
            type="text"
            name="rent"
            id="rent"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="medicalInsurance">
            Select the type of medical insurance that you currently own
          </label>
          <input
            type="text"
            name="medicalInsurance"
            id="medicalInsurance"
            value={medicalInsurance}
            onChange={(e) => setMedicalInsurance(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="familySupport">
            Do you have access to family financial support in case of an
            emergency?
          </label>
          <input
            type="text"
            name="familySupport"
            id="familySupport"
            value={familySupport}
            onChange={(e) => setFamilySupport(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="privateClub">
            Are you a part of some kind of private club?
          </label>
          <input
            type="text"
            name="privateClub"
            id="privateClub"
            value={privateClub}
            onChange={(e) => setPrivateClub(e.target.value)}
            required
          />
        </div>
        <button className="cursor-pointer">Submit</button>
      </form>
    </>
  );
}

export default App;
