const printResult = e => {
  e.preventDefault();
  const detailsTags = document.getElementsByTagName("details");
  for (var i = 0; i < detailsTags.length; i++) {
    detailsTags[i].setAttribute("open", "");
  }
  window.print();
};

export default printResult;
