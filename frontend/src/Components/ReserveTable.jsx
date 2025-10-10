// import InputField from "./InputField"

const ReserveTable = () => {
 

  return (
    <div className="pl-3 pr-3 mt-20 md:pr-6 md:pl-6 ">
      <h1 className="text-xl font-extrabold text-center font-nunito md:text-lg mb-7">Reserve Your Table</h1>
       <div className="rounded-lg p-4 w-full bg-[url('/Reservebg.png')] bg-cover bg-right lg:bg-center">
       
       <div className='flex'>
        <div className="flex flex-col w-full ">
        <div className='text-xl font-normal text-center text-white  font-fredoka md:text-3xl'>Reserve </div>
        <div className="text-center">
           <p className='inline-block text-xl font-normal text-center text-white border-b-4  font-fredoka md:text-3xl border-yellow'>A TABLE </p>
        </div>
       
        <p className="pt-2 text-xs font-normal text-center text-white font-nunito md:text-sm">Discover Our New Menu!</p>
        <p className="pt-2 text-xs font-normal text-center text-white font-nunito md:text-sm">coming sooon feature ...</p>
        </div>
        
        <div className='grid grid-cols-1 grid-rows-5'>
        {/* <InputField
              placeholder="Number of Guests"
              type="number"
              value={numberOfGuests}
              onChange={handleNumberOfGuestsValidation}
              name="guests"
              error={numberOfGuestsError}
            />
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
