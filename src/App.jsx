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
  const title = "{ diablo_con_vestido: tabulador_ }";

  console.log(currency);
  return (
    <>
      <h1 className="text-2xl text-gray-300 text-center p-4">{title}</h1>
      <form
        className="flex flex-col bg-gray-300 border-4 border-pink-500 items-center text-center w-fit p-8 rounded-2xl mx-auto text-md"
        onSubmit={handleClientForm}
      >
        <div className="flex flex-col border-2 border-gray-500 rounded-sm p-4 gap-2 my-3">
          <label htmlFor="name">Type your name and last name:</label>
          <input
            className="bg-gray-400 rounded-xl p-2 text-fuchsia-500 font-semibold"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col border-2 border-gray-500 rounded-sm p-4 gap-2 my-3">
          <label htmlFor="currency">Select your type of currency:</label>
          <select
            className="bg-gray-400 rounded-xl p-2 text-fuchsia-500 font-semibold"
            name="currency"
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Please select --
            </option>
            <option value="EUR">EUR (Euro)</option>
            <option value="USD">USD (United States dolar)</option>
            <option value="MXN">MXN (Mexican peso)</option>
          </select>
        </div>
        <div className="flex flex-col border-2 border-gray-500 rounded-sm p-4 gap-2 my-3">
          <label htmlFor="netIncome">
            Select a monthly net income based on your salary:
          </label>
          <input
            className="bg-gray-400 rounded-xl p-2 text-fuchsia-500 font-semibold"
            type="text"
            name="netIncome"
            id="netIncome"
            value={netIncome}
            onChange={(e) => setNetIncome(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col border-2 border-gray-500 rounded-sm p-4 gap-2 my-3">
          <label htmlFor="rent">Do you pay rent?</label>
          <input
            className="bg-gray-400 rounded-xl p-2 text-fuchsia-500 font-semibold"
            type="text"
            name="rent"
            id="rent"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col border-2 border-gray-500 rounded-sm p-4 gap-2 my-3">
          <label htmlFor="medicalInsurance">
            Select the type of medical insurance that you currently own
          </label>
          <input
            className="bg-gray-400 rounded-xl p-2 text-fuchsia-500 font-semibold"
            type="text"
            name="medicalInsurance"
            id="medicalInsurance"
            value={medicalInsurance}
            onChange={(e) => setMedicalInsurance(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col border-2 border-gray-500 rounded-sm p-4 gap-2 my-3">
          <label htmlFor="familySupport">
            Do you have access to family financial support in case of an
            emergency?
          </label>
          <input
            className="bg-gray-400 rounded-xl p-2 text-fuchsia-500 font-semibold"
            type="text"
            name="familySupport"
            id="familySupport"
            value={familySupport}
            onChange={(e) => setFamilySupport(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col border-2 border-gray-500 rounded-sm p-4 gap-2 my-3">
          <label htmlFor="privateClub">
            Are you a part of some kind of private club?
          </label>
          <input
            className="bg-gray-400 rounded-xl p-2 text-fuchsia-500 font-semibold"
            type="text"
            name="privateClub"
            id="privateClub"
            value={privateClub}
            onChange={(e) => setPrivateClub(e.target.value)}
            required
          />
        </div>
        <button className="cursor-pointer bg-pink-400 text-xl py-2 px-4 my-2 rounded-xl">
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
