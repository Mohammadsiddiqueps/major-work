import React, { useState, useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useMainUsername } from '../../context/Authcontext';
import './Bec_worker_home.scss';

const Bec_worker_home = () => {
  const { mainUsername, setMainUsername } = useMainUsername();
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

  const inputRef = useRef(null);

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

  const [showDiv, setShowDiv] = useState(false);

  return (
    <div className='becworkermain'>
      {!showDiv && (
        <div className="becdet">
          <h1 id='h1becdet'>Become worker make money</h1>
        </div>
      )}
      {showDiv && (
        <div className="becworkerform">
          <form onSubmit={handleSubmit}>
            <div className="profile-input">
              {formData.profilePic ? (
                <img
                  src={URL.createObjectURL(formData.profilePic)}
                  alt="Profile Preview"
                  className="profile-preview"
                  onClick={() => inputRef.current.click()}
                />
              ) : (
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjXc7Er_Z6PaqEZQgRx_rAuyhBtcl2f2uxe-0sz1mc1w&s"
                  alt="Default Profile"
                  className="profile-preview"
                  onClick={() => inputRef.current.click()}
                />
              )}
              <input
                type="file"
                name="profilePic"
                onChange={handleFileChange}
                accept="image/*"
                required
                style={{ display: 'none' }}
                ref={inputRef}
              />
            </div>
            <div className="datainput">

            <label>
              Part Time:
              <input type="radio" name="partTime" value={formData.partTime} onChange={handleChange} required />
            </label>
            <label>
              Full Time:
              <input type="radio" name="partTime" value={formData.partTime} onChange={handleChange} required />
            </label>
            <label>
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
      </div>
          </form>
        </div>
      )}
      <button className='becbutton' onClick={() => setShowDiv(true)}>Become-Worker<FaArrowUp/></button>
    </div>
  );
};

export default Bec_worker_home;
