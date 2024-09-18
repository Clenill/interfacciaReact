function ListGroup() {
  let items = ["New York", "London", "Roma", "Berlin", "Paris", "Milano"];
  //items = [];

  const message = items.length === 0 && <p>Nessun oggetto trovato</p>;

  return (
    <>
      <h1>Lista di oggetti prova</h1>
      {message}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className="list-group-item"
            key={item}
            onClick={() => console.log(item, index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
