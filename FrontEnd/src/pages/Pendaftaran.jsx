import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { motion } from 'motion/react'
import { useState } from 'react'
import RegisInfo from '../components/RegistrationMain'

const Pendaftaran = () => {
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    nik: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    alamat: '',
    provinsi: '',
    kota_kabupaten: '',
    jenis_kelamin: '',
    kode_pos: '',
    no_hp: '',
    email: '',
    asal_sekolah: '',
    tahun_lulus: ''

  })
  const [errors, setErrors] = useState({})
  const onHandleSubmit = async (e) => {
    e.preventDefault()
    // Validasi akhir sebelum submit
    let submitErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) submitErrors[key] = error
    })
    
    setErrors(submitErrors)
    
    if (Object.keys(submitErrors).length === 0) {
      // submit form
      const objData = {...formData}
      console.log(objData)
      try {
        // POST data ke API endpoint
        const response = await fetch('/api/students', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(objData)
        })
  
        // Menangani response dari server
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        console.log('Response from API:', result)
      } catch (error) {
        console.error('Error posting data:', error)
        alert("Error anjir", error)
      }
    }

  }
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Format email tidak valid'
        }
        break
      case 'no_telp':
        if (!/^\d+$/.test(value)) {
          return 'Nomor telepon harus berupa angka'
        }
        break
      case 'nik':
        if (!/^\d+$/.test(value)) {
          return 'NIK harus berupa angka'
        }
        break
      default:
        break
    }
    return ''
  }  
  const handledChange = (e) => {
    const {name, value} = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }
  return (
    <div className='w-screen overflow-x-hidden'>
      <Navbar />
      <main className='h-full min-h-screen md:px-[4rem] px-4 mb-10'>
        <RegisInfo />
        <div id='form' className='flex flex-col justify-center items-center'>
          <h1 className='text-center mt-4 text-dark-green font-bold text-2xl'>Pendaftaran</h1>
          <motion.div initial={{opacity: 0, translateY: 40}} whileInView={{opacity: 1, translateY: 0, transition: {duration: 0.5}}} className='w-full md:max-w-screen-md py-8 mt-4 rounded-md bg-slate-200'>
              <form onSubmit={onHandleSubmit} id=''>
                {/* name */}
                <div className='px-8 pt-4'>
                  <label htmlFor="nama" className='text-dark-green text-sm left-4 group-focus:hidden'>Nama Lengkap</label>
                  <input onChange={handledChange} value={formData.nama_lengkap} placeholder='Nama Lengkap' type="text" name='nama_lengkap' required id='nama' className='w-full px-4 py-2 focus:border-blue-500 focus:border-2 outline-none'/>
                </div>
                {/* nik */}
                <div className='px-8 pt-4'>
                <label htmlFor="nik" className='text-dark-green text-sm left-4 group-focus:hidden'>NIK</label>
                <input
                  onChange={handledChange}
                  value={formData.nik}
                  placeholder='NIK'
                  name='nik'
                  type="text"
                  required
                  id='nik'
                  className='w-full px-4 py-2 focus:border-blue-500 focus:border-2 outline-none'
                />
                {errors.nik && <p className="text-red-500 text-sm mt-1">{errors.nik}</p>}
              </div>
                {/* tempat lahir */}
                <div className='px-8 pt-4'>
                  <label htmlFor="ttl" className='text-dark-green text-sm left-4 group-focus:hidden'>Tempat Lahir</label>
                  <input onChange={handledChange} value={formData.tempat_lahir} placeholder='Tempat Lahir' name='tempat_lahir' type="text" required id='ttl' className='w-full px-4 py-2 focus:border-blue-500 focus:border-2 outline-none'/>
                </div>
                {/* tanggal lahir */}
                <div className='px-8 pt-4'>
                  <label htmlFor="tl" className='text-dark-green text-sm left-4 group-focus:hidden'>Tanggal Lahir</label>
                  <input onChange={handledChange} placeholder='Tanggal Lahir' name='tanggal_lahir' type="date" required id='tl' className='w-full px-4 py-2 focus:border-blue-500 focus:border-2 outline-none'/>
                </div>
                {/* jenis kelamin */}
                <div className='px-8 pt-4'>
                  <p className='block text-sm text-dark-green mb-2'>Jenis Kelamin</p>
                  <label htmlFor="" className='text-sm text-dark-green mr-4'>
                    <input type="radio" checked={formData.jenis_kelamin === 'L'} onChange={handledChange} name='jenis_kelamin' value={"L"}  />
                    Laki Laki
                  </label>
                  <label htmlFor="" className='text-sm text-dark-green'>
                    <input type="radio" checked={formData.jenis_kelamin === 'P'} onChange={handledChange} name='jenis_kelamin' value={"P"}  />
                    Perempuan
                  </label>
                </div>
                {/* alamat */}
                <div className='px-8 pt-4'>
                  <label htmlFor="alamat" className='text-dark-green text-sm'>Alamat</label>
                  <input onChange={handledChange} value={formData.alamat} placeholder='alamat' name='alamat' type="text" required id='alamat' className='w-full px-4 py-2 focus:border-blue-500 focus:border-2 outline-none'/>
                </div>
                {/* provinsi */}
                <div className='px-8 pt-4'>
                  <label htmlFor="provinsi" className='text-dark-green text-sm'>Provinsi</label>
                  <input onChange={handledChange} value={formData.provinsi} placeholder='Provinsi' name='provinsi' type="text" required id='provinsi' className='w-full px-4 py-2 focus:border-blue-500 focus:border-2 outline-none'/>
                </div>
                {/* kab/kota */}
                <div className='px-8 pt-4'>
                  <label htmlFor="kab-kota" className='text-dark-green text-sm'>Kab/Kota</label>
                  <input onChange={handledChange} value={formData.kota_kabupaten} placeholder='KAB/KOTA' name='kota_kabupaten' type="text" required id='kab-kota' className='w-full px-4 py-2 focus:border-blue-500 focus:border-2 outline-none'/>
                </div>
                {/* kode pos */}
                <div className='px-8 pt-4'>
                  <label htmlFor="kodePos" className='text-dark-green text-sm'>Kode Pos</label>
                  <input onChange={handledChange} value={formData.kode_pos} placeholder='Kode Pos' name='kode_pos' type="text" required id='kodePos' className='w-full px-4 py-2 focus:border-blue-500 focus:border-2 outline-none'/>
                </div>
                {/* no telp */}
                <div className='px-8 pt-4'>
                <label htmlFor="telp" className='text-dark-green text-sm'>No telp</label>
                <input
                  onChange={handledChange}
                  value={formData.no_hp}
                  placeholder='Nomor telepon'
                  type="tel"
                  required
                  id='telp'
                  name='no_hp'
                  className='w-full px-4 py-2 focus:border-blue-500 focus:border-2 outline-none'
                />
                {errors.no_telp && <p className="text-red-500 text-sm mt-1">{errors.no_telp}</p>}
              </div>
                {/* email */}
                <div className='px-8 pt-4'>
                <label htmlFor="email" className='text-dark-green text-sm'>Email</label>
                <input
                  onChange={handledChange}
                  value={formData.email}
                  placeholder='Email'
                  name='email'
                  type="email"
                  required
                  id='email'
                  className='w-full px-4 py-2 focus:border-blue-500 focus:border-2 outline-none'
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
                {/* asal sekolah */}
                <div className='px-8 pt-4'>
                  <label htmlFor="prevSchool" className='text-dark-green text-sm'>Asal Sekolah</label>
                  <input onChange={handledChange} value={formData.asal_sekolah} placeholder='Asal Sekolah' name='asal_sekolah' type="text" required id='prevSchool' className='w-full px-4 py-2 focus:border-blue-500 focus:border-2 outline-none'/>
                </div>
                {/* tahun lulus */}
                <div className='px-8 pt-4'>
                  <label htmlFor="tahunLulus" className='text-dark-green text-sm'>Tahun Lulus</label>
                  <input onChange={handledChange} value={formData.tahun_lulus} placeholder='Tahun Lulus' name='tahun_lulus' type="number" required id='tahun_lulus' className='w-full px-4 py-2 focus:border-blue-500 focus:border-2 outline-none'/>
                </div>
                <div className='px-8 pt-4 mt-2'>
                  <button type='submit' className='hover:bg-transparent hover:text-dark-green transition-all hover:border hover:border-dark-green ease-in-out w-full py-2 bg-dark-green text-krem font-semibold'>Kirim</button>
                </div>
              </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Pendaftaran