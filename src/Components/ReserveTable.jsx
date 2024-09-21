// import InputField from "./InputField"

const ReserveTable = () => {
  // const  [phoneNumber,setPhoneNumber] = useState(null);
  //  const [name,setName] = useState(null);
  //  const [date,setDate] = useState(null);
  //  const [time,setTime] = useState(null);
  //  const [numberOfGuests,setNumberOfGuest] = useState(null);
  //  const [note,setNote] = useState(null);
  //  const  [phoneNumberError,setPhoneNumberError] = useState(null);
  //  const [nameError,setNameError] = useState(null);
  //  const [dateError,setDateError] = useState(null);
  //  const [timeError,setTimeError] = useState(null);
  //  const [numberOfGuestsError,setNumberOfGuestError] = useState(null);
  //  const [noteError,setNoteError] = useState(null);

  //  const handlePhoneNumberValidation = (e) => {
  //   const value = e.target.value;
  //   setPhoneNumber(value);
  //   if (!value) {
  //     setPhoneNumberError("Phone number is required");
  //   } else if (value.length !== 12) {
  //     setPhoneNumberError("Phone number must be 12 digits");
  //   } else if (!/^\d+$/.test(value)) {
  //     setPhoneNumberError("Phone number must contain only digits");
  //   } else {
  //     setPhoneNumberError('');
  //   }
  // };

  // const handleNameValidation = (e) => {
  //   const value = e.target.value;
  //   setName(value);
  //   if (!value) {
  //     setNameError("Name is required");
  //   } else if (value.length < 3 || value.length > 100) {
  //     setNameError("Name must be between 3 and 100 characters");
  //   } else if (typeof value !== 'string') {
  //     setNameError("Name must be a valid string");
  //   } else {
  //     setNameError('');
  //   }
  // };

  // const handleDateValidation = (e) => {
  //   const value = e.target.value;
  //   setDate(value);
  //   if (!value) {
  //     setDateError("Date is required");
  //   } else if (isNaN(new Date(value).getTime())) {
  //     setDateError("Invalid date format");
  //   } else {
  //     setDateError('');
  //   }
  // };

  // const handleTimeValidation = (e) => {
  //   const value = e.target.value;
  //   setTime(value);
  //   if (!value) {
  //     setTimeError("Time is required");
  //   } else if (typeof value !== 'string') {
  //     setTimeError("Time must be a valid string");
  //   } else {
  //     setTimeError('');
  //   }
  // };

  // const handleNumberOfGuestsValidation = (e) => {
  //   const value = e.target.value;
  //   setNumberOfGuest(value);
  //   if (!value) {
  //     setNumberOfGuest("Number of guests is required");
  //   } else if (isNaN(value) || value <= 0) {
  //     setNumberOfGuest("Must be a valid number of guests");
  //   } else if (!Number.isInteger(Number(value))) {
  //     setNumberOfGuest("Number of guests must be an integer");
  //   } else {
  //     setNumberOfGuestError('');
  //   }
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // You can add further validation here before submission
  //   if (!phoneNumberError && !nameError && !dateError && !timeError && !numberOfGuestsError) {
  //     // Handle successful submission
  //     console.log("Form submitted successfully!");
  //   }
  // };


  return (
    <div className="mt-20 pl-3  pr-3 md:pr-6 md:pl-6 ">
      <h1 className="font-extrabold font-nunito text-xl md:text-lg text-center mb-7">Reserve Your Table</h1>
       <div className="rounded-lg p-4 w-full bg-[url('/Reservebg.png')] bg-cover bg-right lg:bg-center">
       
       <div className='flex'>
        <div className="flex flex-col w-1/3 ">
        <div className=' text-center font-fredoka font-normal text-xl md:text-3xl text-white'>Reserve </div>
        <div className="text-center">
           <p className=' text-center font-fredoka font-normal text-xl md:text-3xl border-b-4  border-yellow inline-block   text-white'>A TABLE </p>
        </div>
       
        <p className="text-center font-nunito font-normal text-xs md:text-sm pt-2 text-white">Discover Our New Menu!</p>
        </div>
        
        <div className='grid grid-rows-5 grid-cols-1'>
        {/* <InputField
              placeholder="Number of Guests"
              type="number"
              value={numberOfGuests}
              onChange={handleNumberOfGuestsValidation}
              name="guests"
              error={numberOfGuestsError}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                placeholder="Date"
                type="date"
                value={date}
                onChange={handleDateValidation}
                name="date"
                error={dateError}
              />
              <InputField
                placeholder="Time"
                type="time"
                value={time}
                onChange={handleTimeValidation}
                name="time"
                error={timeError}
              />
            </div>
            <InputField
              placeholder="Your Name"
              type="text"
              value={name}
              onChange={handleNameValidation}
              name="name"
              error={nameError}
            />
            {/* Phone Number */}
            {/* <InputField
              placeholder="Phone Number"
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberValidation}
              name="phoneNumber"
              error={phoneNumberError}
            />
            <InputField
              placeholder="Add a Note (optional)"
              type="text"
              value={note}
              onChange={handleNa}
              name="note"
              error={errors.note}
            /> */} 


        </div>
       </div>
    </div>
    </div>
   
  )
}

export default ReserveTable
