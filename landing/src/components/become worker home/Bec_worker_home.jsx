import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMainUsername } from '../../context/Authcontext'

const Bec_worker_home = () => {
  const {mainUsername,setMainUsername}=useMainUsername()
  const [formData, setFormData] = useState({
    partTime: '',
    skills: '',
    location: '',
    preferredJobs: [],
    description: '',
    profilePic: null,
  });

  const jobOptions = ['Web Development', 'Graphic Design', 'Data Entry', 'Customer Support'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    const updatedPreferredJobs = formData.preferredJobs.includes(value)
      ? formData.preferredJobs.filter((job) => job !== value)
      : [...formData.preferredJobs, value];

    setFormData({
      ...formData,
      preferredJobs: updatedPreferredJobs,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profilePic: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for form submission here
    console.log(formData);
  };

  return (
    <div>

 
    <form onSubmit={handleSubmit}>
      <label>
        Profile Pic:
        <input type="file" name="profilePic" onChange={handleFileChange} accept="image/*" required />
      </label>
    <label>
        Part Time:
        <input type="radio" name="partTime" value={formData.partTime} onChange={handleChange} required />
      </label>
      <label>
        full Time:
        <input type="radio" name="partTime" value={formData.partTime} onChange={handleChange} required />
      </label> <label>
        Part/full:
        <input type="radio" name="partTime" value={formData.partTime} onChange={handleChange} required />
      </label>

      <label>
        Skills:
        <input type="text" name="skills" value={formData.skills} onChange={handleChange} required />
      </label>

      <label>
        Location:
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
      </label>





      <label>
        Preferred Jobs:
        {jobOptions.map((job) => (
          <div key={job}>
            <input
              type="checkbox"
              name="preferredJobs"
              value={job}
              checked={formData.preferredJobs.includes(job)}
              onChange={handleCheckboxChange}
            />
            {job}
          </div>
        ))}
      </label>

      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </label>

      <button type="submit">Submit</button>
    </form>
  

    </div>
  )
}

export default Bec_worker_home 