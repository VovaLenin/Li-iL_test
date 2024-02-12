const services = [
  {
    id: 1,
    head: null,
    name: "Проф.осмотр",
    node: 0,
    price: 100.0,
    sorthead: 20,
  },
  {
    id: 2,
    head: null,
    name: "Хирургия",
    node: 1,
    price: 0.0,
    sorthead: 10,
  },
  {
    id: 3,
    head: 2,
    name: "Удаление зубов",
    node: 1,
    price: 0.0,
    sorthead: 10,
  },
  {
    id: 4,
    head: 3,
    name: "Удаление зуба",
    node: 0,
    price: 800.0,
    sorthead: 10,
  },
  {
    id: 5,
    head: 3,
    name: "Удаление 8ого зуба",
    node: 0,
    price: 1000.0,
    sorthead: 30,
  },
  {
    id: 6,
    head: 3,
    name: "Удаление осколка зуба",
    node: 0,
    price: 2000.0,
    sorthead: 20,
  },
  {
    id: 7,
    head: 2,
    name: "Хирургические вмешательство",
    node: 0,
    price: 200.0,
    sorthead: 10,
  },
  {
    id: 8,
    head: 2,
    name: "Имплантация зубов",
    node: 1,
    price: 0.0,
    sorthead: 20,
  },
  {
    id: 9,
    head: 8,
    name: "Коронка",
    node: 0,
    price: 3000.0,
    sorthead: 10,
  },
  {
    id: 10,
    head: 8,
    name: "Слепок челюсти",
    node: 0,
    price: 500.0,
    sorthead: 20,
  },
];

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(services);
    }, 2000);
  }); // ЭМУЛЯЦИЯ АСИНХРОННОГО ПОВЕДЕНИЯ СЕРВЕРА

async function fetchData() {
  const response = fetchAll();
  if (!response) {
    throw new Error("Ошибка при получении данных");
  }
  return await response;
} // АСИНХРОННЫЙ ЗАПРОС ДАННЫХ

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("tree");
  try {
    const data = await fetchData();
    buildTree(data, container);
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
});

function toggleList(event) {
  event.stopPropagation(); // Останавливаем всплытие события
  const sublist = event.target.querySelector("ul");
  if (sublist) {
    sublist.classList.toggle("opened");
    event.target.classList.toggle("opened");
  }
}

function buildTree(data, container, parentId = null) {
  const ul = document.createElement("ul");
  container.appendChild(ul);

  const filteredData = data.filter((item) => item.head === parentId);

  filteredData.sort((a, b) => a.sorthead - b.sorthead);

  filteredData.forEach((item) => {
    const li = document.createElement("li");
    ul.appendChild(li);
    li.textContent = `${item.name}`;
    if (item.price !== 0) {
      li.textContent += ` (${item.price})`;
    }

    if (item.node === 1) {
      li.classList.add("has-sublist");
      li.addEventListener("click", toggleList); // Добавляем обработчик события клика
      buildTree(data, li, item.id); // Рекурсивно добавляем дочерние элементы к текущему li
    } else {
      li.classList.add("no-children");
    }
  });
}
