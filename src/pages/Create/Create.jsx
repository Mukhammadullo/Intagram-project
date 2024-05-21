import React from 'react'
import { useSelector } from 'react-redux'
import CreateModal from '../../components/Layout/CreateModal';
function Create() {
  const modalCreate = useSelector((store) => store.layout.modalCreate);
  console.log(modalCreate);
  return (
    <div>
          <div style={{display:modalCreate?"block":"none"}} className={` bg-[red]`}>
          <div>
              <h2>Создание публикации</h2>
              <hr />
              <div>
                  <div><img src="src/assets/images/img_Create.jpg" alt="" /></div>
                  <div>
                      <h1>Перетащите сюда фото и видео</h1>
                      <button>Выбрать на компьютер</button>
                  </div>
              </div>
          </div>
      </div>
      <CreateModal />
    </div>
  )
}

export default Create