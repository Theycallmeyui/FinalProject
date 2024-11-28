
const orderNowButton = document.querySelector('.home .btn');
if (orderNowButton) {
    orderNowButton.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('#dishes').scrollIntoView({ behavior: 'smooth' });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    new Swiper(".home-slider", {
        loop: true,
        spaceBetween: 30,
        centeredSlides: true, 
        autoplay: {
            delay: 5000, 
            disableOnInteraction: false, 
        },
        pagination: {
            el: ".swiper-pagination", 
            clickable: true, 
        },
        navigation: {
            nextEl: ".swiper-button-next", 
            prevEl: ".swiper-button-prev", 
        },
    });
});
document.addEventListener('DOMContentLoaded', () => {
  const cart = []; 
  const orderContainer = document.querySelector('.order-container'); 
  const checkoutButton = document.querySelector('.checkout'); 
  const continueOrderButton = document.querySelector('.continue-order'); 
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  const renderOrder = () => {
      orderContainer.innerHTML = '';

      if (cart.length === 0) {
          orderContainer.innerHTML = '<p>장바구니가 비어 있습니다. 메뉴에서 추가해주세요!</p>';
          return;
      }

      let totalCost = 0;

      const orderList = document.createElement('ul');
      orderList.classList.add('order-list');

      cart.forEach((item, index) => {
          totalCost += item.price * item.quantity;

          const orderItem = document.createElement('li');
          orderItem.classList.add('order-list-item');
          orderItem.innerHTML = `
              <h3>${item.name}</h3>
              <p>가격: ${item.price.toFixed(2)} 원 </p>
              <p>
                  수량: 
                  <button class="decrease-quantity" data-index="${index}">-</button>
                  ${item.quantity}
                  <button class="increase-quantity" data-index="${index}">+</button>
              </p>
              <p>총 금액: ${(item.price * item.quantity).toFixed(2)} 원 </p>
              <button class="remove-item" data-index="${index}">삭제</button>
          `;
          orderList.appendChild(orderItem);
      });

      const totalDisplay = document.createElement('div');
      totalDisplay.classList.add('order-total');
      totalDisplay.innerHTML = `<h2>총 금액: ${totalCost.toFixed(2)} 원 </h2>`;

      orderContainer.appendChild(orderList);
      orderContainer.appendChild(totalDisplay);
  };

 
  addToCartButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
          event.preventDefault(); 
          const dishElement = button.closest('.box');
          const name = dishElement.querySelector('h3').textContent;
          const price = parseFloat(dishElement.querySelector('span').textContent.replace('$', ''));

          const existingItem = cart.find((item) => item.name === name);
          if (existingItem) {
              existingItem.quantity += 1;
          } else {
              cart.push({ name, price, quantity: 1 });
          }

          renderOrder();
          alert(`${name}이(가) 장바구니에 추가되었습니다.`);
      });
  });

  orderContainer.addEventListener('click', (event) => {
      const index = event.target.dataset.index;

      if (event.target.classList.contains('increase-quantity')) {
          cart[index].quantity += 1;
          renderOrder();
      } else if (event.target.classList.contains('decrease-quantity')) {
          if (cart[index].quantity > 1) {
              cart[index].quantity -= 1;
          } else {
              cart.splice(index, 1); 
          }
          renderOrder();
      } else if (event.target.classList.contains('remove-item')) {
          cart.splice(index, 1); 
          renderOrder();
      }
  });

  checkoutButton.addEventListener('click', () => {
      if (cart.length > 0) {
          let totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
          alert(`결제가 완료되었습니다. 감사합니다!`);
          cart.length = 0; 
          renderOrder();
      } else {
          alert('장바구니가 비어 있습니다!');
      }
  });

  continueOrderButton.addEventListener('click', () => {
      document.querySelector('#dishes').scrollIntoView({ behavior: 'smooth' }); 
  });

  
  renderOrder();
});
document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.querySelector('#book form'); 

  if (bookingForm) {
      bookingForm.addEventListener('submit', (event) => {
          event.preventDefault();

          const inputs = bookingForm.querySelectorAll('input, textarea');

          let allFilled = true;
          inputs.forEach((input) => {
              if (!input.value.trim()) {
                  allFilled = false;
              }
          });

          if (!allFilled) {
              alert('내용들 입력해주세요!');
          } else {
              alert('예약완료되었습니다!'); 
              bookingForm.reset(); 
          }
      });
  }
});

