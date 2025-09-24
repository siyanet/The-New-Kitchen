



// referrerpolicy="no-referrer-when-downgrade"

const PizzaHutMap = () => {
  return (
    <div className="mx-5 mt-36 ">
      <p className="text-center font-nunito font-extrabold text-xl pb-7 text-black ">Come find us</p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126103.42594695969!2d38.63389119726562!3d8.996784200000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8502576f1a43%3A0x45ce149b03652d0!2sPizza%20Hut%20Morning%20Star!5e0!3m2!1sam!2set!4v1729433969310!5m2!1sam!2set"
        className="w-full min-h-[350px] "
        
        style={{ border: '0' }} // Correct usage of the `style` prop
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default PizzaHutMap;
