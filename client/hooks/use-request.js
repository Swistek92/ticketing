import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
  // method=== post get path
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      // console.log(url);
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });
      // console.log(response);

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      // console.log(err);
      setErrors(
        <div className='alert alert-danger'>
          <h4>Ooops....</h4>
          <ul className='my-0'>
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );

      // throw err;
    }
  };

  return { doRequest, errors };
};

export default useRequest;
