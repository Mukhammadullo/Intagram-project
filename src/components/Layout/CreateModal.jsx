import { useDispatch, useSelector } from "react-redux";
import img1 from "../../assets/images/imgCreate.jpg";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { setModalCreate } from "../../reducers/Layout/Layout";
import { fileToBase64 } from "../../utils/fileToBase64";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import UserImg from "../../assets/images/polzovatel.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { addNewPost, getpost, getAvatarById } from "../../api/Create/create";
import "../../Create.css"
import { getToken } from "../../utils/token";

// const [base64F, setBase64F] = useState(null)



const CreateModal = (props) => {
  let dispatch = useDispatch();
  const postData = useSelector((store) => store.Create.postData)
  const avatar = useSelector((store) => store.Create.avatar)
  console.log(avatar);
  console.log(postData);


  const [inpcontent, setInpcontent] = useState("");
  const [inptitle, setInptitle] = useState("");

  const [next, setNext] = useState(false);
  const [img, setImg] = useState(null)
  const [inpimg, setInpimg] = useState(null)
  const [input, setInput] = useState(null)
  const [input1, setInput1] = useState(null)



  let arrimg = []
  let handlImg = async (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      arrimg.push(event.target.files[i])
    }
    setImg(arrimg);
  };

  const handlepost = async (files) => {
    let arr1 = []
    for (let i = 0; i < files.length; i++) {
      let file = await fileToBase64(files[i])
      arr1.push({
        id: Date.now(),
        img: file
      })
    }
    setInpimg(arr1)
  }



  const handlesubmit = () => {
    let form = new FormData()
    form.append("title", input)
    form.append("content", input1)
    for (let i = 0; i < img.length; i++) {
      form.append(`images`, img[i])
    }
    dispatch(addNewPost(form))
  }

  const userId = getToken()?.sid
  console.log(userId);


  useEffect(() => {
    dispatch(getpost())
    dispatch(getAvatarById(userId))
  }, [dispatch, userId])


  return (
    <div className="flex justify-center items-center w-full h-full bg-[#000000b3] z-10 fixed">
      <button onClick={() => dispatch(setModalCreate(false))}>
        <CloseIcon className="fixed text-[28px] top-[15px] right-3 text-[#fff]">x</CloseIcon>
      </button>
      <div style={{ width: img == null ? "36%" : "50% " }} className="bg-[white] w-[600px] h-[600px] rounded-[10px] mt-[50px]">
        <h2 style={{ display: img == null ? "block" : "none" }} className="text-center font-medium pt-[10px] pb-[5px]">Создание публикации</h2>
        <div style={{ display: img == null ? "none" : "flex" }} className="flex pr-[5%] items-center justify-between pt-[3%] ">
          <button
            onClick={() => {
              {
                setImg(null),
                  setNext(false)
              }
            }}
            className="ml-[4%]"
          >
            <KeyboardBackspaceIcon />
          </button>
          <p className="font-bold">Crop</p>
          <button
            onClick={() => {
              dispatch(addNewPost({
                images: img,
              }))
              setNext(true)
            }
            }
            style={{ display: next ? "none" : "block" }}
            className="  cursor-pointer  text-[#4366cc]"
          >
            Next
          </button>
          <button style={{ display: next ? "block" : "none" }} onClick={() => { handlesubmit(), dispatch(setModalCreate(false), setImg(null), setInpcontent(""), setInptitle("")) }} className={` text-[#4876fe] font-bold`}>Поделиться</button>
        </div>
        <hr className="border-[1px] border-[#80808079]" />
        <div className="p-[20px] justify-center h-[100%] flex self-center items-center">
          <div style={{ display: img == null ? "flex" : "none" }} className="flex flex-col ml-[100px] items-center">
            <img className="w-[90px]" src={img1} alt="" />
            <div className="text-center">
              <h1 className="mt-[15px] text-[18px] w-[300px]">Перетащите сюда фото и видео</h1>
              <form
                method="post"
                enctype="multipart/form-data"
                className=""
              >
                <label class="input-file">
                  <input
                    type="file"
                    onChange={(e) => { handlImg(e), handlepost(e.target.files) }}
                    name="file"
                    multiple={true}
                  />
                  <img
                    style={{ display: img == null ? "none" : "block" }}
                    className=" p-[60px] m-auto fixed left-0 right-0   "
                    src={inpimg}
                    alt=""
                  />
                  <span className="text-white font-medium mt-[15px]">
                    Выбрать на компьютере
                  </span>
                </label>
              </form>
            </div>
          </div>
          <Swiper>
            <div>
              {
                inpimg?.map((el) => {
                  console.log(el);
                  return (
                    <div className="flex justify-around" key={el.id}>
                      <SwiperSlide >
                        <img
                          style={{ display: img == null ? "none" : "block", width: next ? "100%" : "100%", height: "450px" }}
                          src={el.img}
                        />
                      </SwiperSlide>
                    </div>
                  )
                })
              }
            </div>
          </Swiper>
          <div style={{ display: next ? "block" : "none" }}>
            {
              userId ? (<div className="flex items-center gap-3">
                <img className="w-[30px] rounded-full" src={avatar.image != null|| avatar.image != 0 ? `${import.meta.env.VITE_APP_FILES_URL
                  }${avatar.image}` : UserImg} alt="" />
                <h1>{avatar.userName}</h1>
              </div>) : null



            }
            <div className="flex flex-col gap-4">
              <input value={input} onChange={(e) => setInput(e.target.value)} className="border-[1px] border-[gray] outline-none rounded-[2px] p-[5px] w-[250px] ml-[20px]" type="text" name="" id="" placeholder=" Name" />
              <input value={input1} onChange={(e) => setInput1(e.target.value)} className="border-[1px] border-[gray] outline-none rounded-[2px] p-[5px] w-[250px] ml-[20px] mt-[15px]" type="text" name="" id="" placeholder=" Bio" />
            </div>


          </div>




        </div>
      </div>
    </div>
  )
};

export default CreateModal;
