import { useState } from "react";
import { PacmanLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

function App() {
  //Data states
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("");
  const [netIncome, setNetIncome] = useState("");
  const [rent, setRent] = useState("");
  const [healthInsurance, setHealthInsurance] = useState("");
  const [familySupport, setFamilySupport] = useState("");
  const [privateClub, setPrivateClub] = useState("");
  //Functional states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleClientForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/client/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          currency,
          netIncome,
          rent,
          healthInsurance,
          familySupport,
          privateClub,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log("Response is not OK!");
        setError(data.message);
      } else {
        console.log("Response is OK!");
        setSubmitted(true);
        setName("");
        setCurrency("");
        setNetIncome("");
        setRent("");
        setHealthInsurance("");
        setFamilySupport("");
        setPrivateClub("");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const title = "{ diablo_con_vestido: tabulador_ }";

  return (
    <>
      <h1 className="text-2xl text-gray-300 text-center p-4">{title}</h1>
      <form
        className="flex flex-col bg-gray-300 border-3 border-pink-500 animate-borderGlow items-center text-center max-w-2xl p-8 rounded-2xl mx-auto text-md"
        onSubmit={handleClientForm}
      >
        <fieldset className="flex flex-col border-2 border-gray-500 rounded-sm p-4 gap-2 my-3">
          <legend className="px-2">Type your first and last name</legend>
          <input
            className="bg-gray-400 rounded-xl p-2 text-fuchsia-500 font-semibold"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </fieldset>
        <fieldset className="flex flex-col border-2 border-gray-500 rounded-sm p-4 gap-2 my-3">
          <legend className="px-2">Select your type of currency:</legend>
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
        </fieldset>
        <fieldset className="flex flex-col border-2 border-gray-500 rounded-sm p-4 gap-2 my-3">
          <legend className="px-2">
            Select a monthly net income based on your salary:
          </legend>
          <select
            className="bg-gray-400 rounded-xl p-2 text-fuchsia-500 font-semibold"
            name="netIncome"
            id="netIncome"
            value={netIncome}
            onChange={(e) => setNetIncome(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Please select --
            </option>
            {currency === "EUR" && <option value="1000">1,000 euros</option>}
            {currency === "USD" && <option value="1500">1,500 dolars</option>}
            {currency === "MXN" && <option value="20000">20,000 pesos</option>}
          </select>
        </fieldset>
        <fieldset className="flex flex-col border-2 border-gray-500 rounded-sm p-4 gap-2 my-3">
          <legend className="px-2">Do you pay rent?</legend>
          <div className="flex justify-center gap-15">
            <div className="flex flex-col">
              <div className="grid place-items-center">
                <input
                  className="appearance-none w-5 h-5 border-2 border-fuchsia-500 col-start-1 row-start-1 z-10"
                  type="radio"
                  name="rent"
                  id="rent-yes"
                  value="Yes"
                  //checked if rent is initially equal to "Yes". Keeps everything in sync
                  checked={rent === "Yes"}
                  onChange={(e) => setRent(e.target.value)}
                  //only one required per radio combo
                  required
                />
                {rent === "Yes" && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size="sm"
                    className="col-start-1 row-start-1 z-0 mx-auto text-fuchsia-500"
                  />
                )}
              </div>
              <label htmlFor="rent-yes">Yes</label>
            </div>
            <div className="flex flex-col">
              <div className="grid place-items-center">
                <input
                  className="appearance-none w-5 h-5 border-2 border-fuchsia-500 col-start-1 row-start-1 z-10"
                  type="radio"
                  name="rent"
                  id="rent-no"
                  value="No"
                  checked={rent === "No"}
                  onChange={(e) => setRent(e.target.value)}
                />
                {rent === "No" && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size="sm"
                    className="col-start-1 row-start-1 z-0 mx-auto text-fuchsia-500"
                  />
                )}
              </div>
              <label htmlFor="rent-no">No</label>
            </div>
          </div>
        </fieldset>
        <fieldset className="flex flex-col border-2 border-gray-500 rounded-sm p-4 gap-2 my-3">
          <legend className="px-2">
            Select the type of health insurance that you currently own
          </legend>
          <select
            className="bg-gray-400 rounded-xl p-2 text-fuchsia-500 font-semibold"
            name="healthInsurance"
            id="healthInsurance"
            value={healthInsurance}
            onChange={(e) => setHealthInsurance(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Please select --
            </option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
            <option value="None">None</option>
          </select>
        </fieldset>
        <fieldset className="flex flex-col border-2 border-gray-500 rounded-sm p-4 gap-2 my-3">
          <legend className="px-2">
            Do you have access to family financial support in case of an
            emergency?
          </legend>
          <div className="flex justify-center gap-15">
            <div className="flex flex-col">
              <div className="grid place-items-center">
                <input
                  className="appearance-none w-5 h-5 border-2 border-fuchsia-500 col-start-1 row-start-1 z-10"
                  type="radio"
                  name="familySupport"
                  id="familySupport-yes"
                  value="Yes"
                  checked={familySupport === "Yes"}
                  onChange={(e) => setFamilySupport(e.target.value)}
                  required
                />
                {familySupport === "Yes" && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size="sm"
                    className="col-start-1 row-start-1 z-0 mx-auto text-fuchsia-500"
                  />
                )}
              </div>
              <label htmlFor="familySupport-yes">Yes</label>
            </div>
            <div className="flex flex-col">
              <div className="grid place-items-center">
                <input
                  className="appearance-none w-5 h-5 border-2 border-fuchsia-500 col-start-1 row-start-1 z-10"
                  type="radio"
                  name="familySupport"
                  id="familySupport-no"
                  value="No"
                  checked={familySupport === "No"}
                  onChange={(e) => setFamilySupport(e.target.value)}
                />
                {familySupport === "No" && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size="sm"
                    className="col-start-1 row-start-1 z-0 mx-auto text-fuchsia-500"
                  />
                )}
              </div>
              <label htmlFor="familySupport-no">No</label>
            </div>
          </div>
        </fieldset>
        <fieldset className="flex flex-col border-2 border-gray-500 rounded-sm p-4 gap-2 my-3">
          <legend className="px-2">
            Are you a part of some kind of private club like an athletic club,
            country club, etc.?
          </legend>
          <div className="flex justify-center gap-15">
            <div className="flex flex-col">
              <div className="grid place-items-center">
                <input
                  className="appearance-none w-5 h-5 border-2 border-fuchsia-500 col-start-1 row-start-1 z-10"
                  type="radio"
                  name="privateClub"
                  id="privateClub-yes"
                  value="Yes"
                  checked={privateClub === "Yes"}
                  onChange={(e) => setPrivateClub(e.target.value)}
                  required
                />
                {privateClub === "Yes" && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size="sm"
                    className="col-start-1 row-start-1 z-0 mx-auto text-fuchsia-500"
                  />
                )}
              </div>
              <label htmlFor="privateClub-yes">Yes</label>
            </div>
            <div className="flex flex-col">
              <div className="grid place-items-center">
                <input
                  className="appearance-none w-5 h-5 border-2 border-fuchsia-500 col-start-1 row-start-1 z-10"
                  type="radio"
                  name="privateClub"
                  id="privateClub-no"
                  value="No"
                  checked={privateClub === "No"}
                  onChange={(e) => setPrivateClub(e.target.value)}
                />
                {privateClub === "No" && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    size="sm"
                    className="col-start-1 row-start-1 z-0 mx-auto text-fuchsia-500"
                  />
                )}
              </div>
              <label htmlFor="privateClub-no">No</label>
            </div>
          </div>
        </fieldset>
        <div className="flex justify-center my-2">
          {loading && <PacmanLoader color="#fb64b6" />}
          {error && (
            <p className="text-xl font-semibold text-red-600">Error: {error}</p>
          )}
          {submitted && (
            <p className="text-2xl font-semibold text-green-600">
              Form submitted!
            </p>
          )}
          {!loading && !submitted && !error && (
            <button className="cursor-pointer bg-pink-400 text-xl py-2 px-4 rounded-xl">
              Submit
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default App;
