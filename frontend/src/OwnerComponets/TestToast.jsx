
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../Components/notify';

const TestToast = () => {
    const handleClick = () => {
        notify("Category Added Successfully!", "success");
        
      };
    
      return (
        <div className='flex items-center justify-center w-full h-full'>
          <button onClick={handleClick}>Show Toast</button>
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      );
    };

export default TestToast;
