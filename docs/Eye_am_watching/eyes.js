const ball = document.getElementsByClassName('ball');

document.onmousemove = (event) => {
  const x = (event.clientX * 100) / window.innerWidth + '%';
  const y = (event.clientY * 100) / window.innerHeight + '%';
  for (let counter=0; counter < ball.length; counter++)
  {
    ball[counter].style.left = x;
    ball[counter].style.top = y;
    ball[counter].transform = 'translate(-' + x + ',-' + y + ')';
  }
};
