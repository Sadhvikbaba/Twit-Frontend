import React from 'react';
import { useForm } from 'react-hook-form';

const ComplaintForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const email = String(import.meta.env.VITE_MAIL);
    const subject = 'User Complaint';
    const body = encodeURIComponent(data.complaint);
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-2xl font-bold mb-4 text-white">Contact us</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md  p-8 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="complaint" className="block text-gray-500 text-sm font-bold mb-2">
            covey your matter :
          </label>
          <textarea
            id="complaint"
            {...register('complaint', { required: true })}
            rows="6"
            className={`w-full px-3 py-2 text-white bg-gray-800 border rounded-lg focus:outline-none ${errors.complaint ? 'border-red-500' : ''}`}
          ></textarea>
          {errors.complaint && <p className="text-red-500 text-xs mt-2">This field is required</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintForm;
