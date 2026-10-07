function formatSalary(salary) {
  if (salary.type === "RANGE") {
    const min = (salary.min / 1000000).toFixed(0); 
    const max = (salary.max / 1000000).toFixed(0);
    return `${min} - ${max} triệu`;
  }

  if (salary.type === "AGREEMENT") {
    return "Thỏa thuận";
  }

  return "Không rõ";
}

export default formatSalary;