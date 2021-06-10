const curdate = () => {
  let date = new Date();
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let year = String(date.getFullYear()).substr(2, 4);
  let today = day + month + year;

  return today;
};

export default curdate;