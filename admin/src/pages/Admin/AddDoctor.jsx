import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { types } from "../../constants";
import { Admincontext } from "../../context/AdminContext";
import axios from 'axios';
import { toast } from "react-toastify";

const AddDoctor = () => {
  const [name,set_name] = useState('')
  const [email,set_email] = useState('')
  const [password,set_password] = useState('')
  const [experience,set_experience] = useState('0-1 Years')
  const [fees,set_fees] = useState('')
  const [speciality,set_speciality] = useState('General Physician')
  const [education,set_education] = useState('')
  const [addr1,set_addr1] = useState('')
  const [addr2,set_addr2] = useState('')
  const [about,set_about] = useState('')
  const [img,set_img]= useState(false);

  const { backendUrl ,Token } = useContext(Admincontext)
  
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if(!img){
        return toast.error('Image Not Selected')
      }
      console.log(backendUrl);
      const form_data = new FormData();
      form_data.append('image',img);
      form_data.append('name',name);
      form_data.append('email',email);
      form_data.append('password',password);
      form_data.append('experience',experience);
      form_data.append('fees',Number(fees));
      form_data.append('speciality',speciality)
      form_data.append('degree',education)
      form_data.append('about',about);
      form_data.append('address',JSON.stringify({line1:addr1,line2:addr2}));

      // data
      const {data} = await axios.post(backendUrl+'api/admin/add-doctor',form_data,{headers:{Token}});
      
      if(data.success){
        toast.success(data.message);
        set_img(false);
        set_about('');
        set_addr1('');
        set_addr2('');
        set_education('');
        set_email('');
        set_experience('');
        set_fees('');
        set_name('');
        set_password('');
        set_speciality('');
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }    
  }
  return (
    <form className="m-5 w-full" onSubmit={onSubmit}>
      <p className="mb-3 text-lg font-semibold ml-7"> Add Doctor </p>
      
      <div className="bg-white px-8 py-8 border-gray-300 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img src={img ? URL.createObjectURL(img) : assets.upload_area} className="w-16 bg-gray-100 rounded-full cursor-pointer" alt="" />
          </label>
          <input type="file" onChange={(e)=>set_img(e.target.files[0])} id="doc-img" hidden />
          <p>
            Upload Doctor <br /> Picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex-col gap-4">

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input type="text" onChange={(e)=>set_name(e.target.value)} value={name}className="border rounded px-3 py-2" placeholder="Enter name" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input type="email" onChange={(e)=>set_email(e.target.value)} value={email} className="border rounded px-3 py-2" placeholder="Enter Email" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input type="password" onChange={(e)=>set_password(e.target.value)} value={password} className="border rounded px-3 py-2" placeholder="Enter Password" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select onChange={(e)=>set_experience(e.target.value)} value={experience} name="" id="" className="border rounded px-3 py-2">
                <option value="0-1 Years">0-1 Year</option>
                <option value="2-5 Years">2-5 Year</option>
                <option value="6-10 Years">6-10 Year</option>
                <option value="10+ Years">10+ Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input type="number" onChange={(e)=>set_fees(e.target.value)} value={fees} placeholder="Enter Fees" required className="border rounded px-3 py-2" />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select onChange={(e)=>set_speciality(e.target.value)} value={speciality} name="" id="" className="border rounded px-3 py-2">
                {types.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1" >
              <p>Degree(s)</p>
              <input type="text" onChange={(e)=>set_education(e.target.value)} value={education} placeholder="Eg: MBBS, MD, MS..etc" required className="border rounded px-3 py-2"/>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input type="text" onChange={(e)=>set_addr1(e.target.value)} value={addr1} placeholder="Address 1" required className="border rounded px-3 py-2"/>
              <input type="text" onChange={(e)=>set_addr2(e.target.value)} value={addr2} placeholder="Address 2" required className="border rounded px-3 py-2"/>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea placeholder="Write about doctor" onChange={(e)=>set_about(e.target.value)} value={about} rows={5} required className="border rounded px-3 py-2"/>
        </div>
        <button type="submit" className="bg-[#5F6FFF] px-10 py-3 mt-4 text-white rounded-full">Add Doctor</button>
      </div>
    </form>
  );
};

export default AddDoctor;