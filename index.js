

// 2ta function deya data get kora possible 
const  hendleCategory = async () => {
   const respons=await fetch('https://openapi.programming-hero.com/api/news/categories')
   const data= await respons.json();
   const categores= data.data.news_category.slice(0,5);
//   console.log(data.data.news_category);

  const manuContaienr=document.getElementById('manu-container');
  categores.forEach(category =>{ 
    // console.log(category)
  const li=document.createElement('li');
  li.innerHTML=`
  <a onclick="hendelLoadNews('${category.category_id}')">${category.category_name}</a>
  `;
  manuContaienr.appendChild(li);
  
});

   
};

const hendelLoadNews= async (categoryId) => {
    // console.log(categoryId)
    const res=await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    const  data=await res.json();
      
    // console.log(data.data)
    const cardContainer=document.getElementById('card-container');
    cardContainer.innerHTML="";

    data.data.forEach(news=>{
       
        const div=document.createElement('div');
        div.classList.add('card', 'bg-base-100', 'shadow-xl',);
        div.innerHTML=`
    
              <figure>
                <img
                  src="${news?.image_url}"
                  alt="Image not  found"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title">
                ${news?.title.slice(0,40)}
                  <div class="badge badge-secondary p-5"> ${news?.rating?.badge}</div>
                </h2>
                <p>
                ${news?.details.slice(0,55)}
                </p>
                <p>
                <h3> totoal viws: ${
                    news.total_view ? news.total_view : "no vviews"
                  }</h3>
                </p>
                <div class="card-footer flex justify-between mt-8">
                  <div class="flex">
                    <div>
                      <div class="avatar online">
                        <div class="w-14 rounded-full">
                          <img
                            src="${news?.author?.img}"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h6>${news?.author?.name}</h6>
                      <small>${news?.author?.published_date}</small>
                    </div>
                  </div>
                  <div class="card-detaild-btn">
                    <button onclick="handleNewsModal('${news?._id}')"
                      class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
           
        `;
        cardContainer.appendChild(div);
    })
};

const handleNewsModal =async (newsId) =>{
    const res= await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
      const data=await res.json();
      
    console.log(data);
    const modalContainer=document.getElementById('modal-container');
    data.data.forEach(modalNews=>{

  
    const div=document.createElement('div');
    div.innerHTML =`
  <dialog id="news_modal" class="modal modal-bottom sm:modal-middle">
  <form method="dialog" class="modal-box">
       <h1 class="text-4xl font-bold text-blue-500 my-3">${modalNews?.title}</h1
  
       <img src="${modalNews?.thumbnail_url}" alt="News Thumbnail" class="max-w-full h-auto" />
     
       <img src="${modalNews?.thumbnail_url}" alt="News Thumbnail" class="max-w-full h-auto" />
   
       <p class="text-lg font-medium my-3">${modalNews?.details}</p>

   <div class= "text-right"><button class="btn">Close</button></div>
  
  </form>
</dialog>
    `;
 
    modalContainer.appendChild(div);
    const modal = document.getElementById("news_modal");

    modal.showModal();
});
}
hendleCategory();
hendelLoadNews("01")