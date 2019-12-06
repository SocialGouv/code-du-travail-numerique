const printResult = e => {
  e.preventDefault();
  const currentDate = new Date().toLocaleString();
  const title = document.title;

  document.title = `${title} le ${currentDate.slice(
    0,
    10
  )} à ${currentDate.slice(11, 17)}`;

  const detailsTags = document.getElementsByTagName("details");
  for (var i = 0; i < detailsTags.length; i++) {
    detailsTags[i].setAttribute("open", "");
  }
  window.print();
  document.title = title;
};

export default printResult;
