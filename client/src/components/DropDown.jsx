import React, { useState } from "react";

const AccommodationDropdown = () => {
  const [selectedAccommodation, setSelectedAccommodation] = useState("");

  const handleAccommodationChange = (e) => {
    setSelectedAccommodation(e.target.value);
  };

  return (
    <div className="flex gap-2 text-lg font-semibold">
      <label htmlFor="accommodation">
        Accommodation:
      </label>
      <select
        id="accommodation"
        value={selectedAccommodation}
        onChange={handleAccommodationChange}
      >
        <option value="">Select an Accommodation</option>
        <option value="Tents">Tents</option>
        <option value="Cabins">Cabins</option>
        <option value="RVs">RVs</option>
        <option value="Glamping">Tree House</option>
      </select>
    </div>
  );
};

export default AccommodationDropdown;
