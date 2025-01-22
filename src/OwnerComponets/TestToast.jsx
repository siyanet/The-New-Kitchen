
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../Components/notify';

const TestToast = () => {
    const handleClick = () => {
        notify("Category Added Successfully!", "success");
        
      };
    
      return (
        <div className='flex w-full h-full justify-center items-center'>
          <button onClick={handleClick}>Show Toast</button>
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      );
    };

export default TestToast;
