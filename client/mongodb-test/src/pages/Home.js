import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllData } from "../stores/actions/userAction";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { fetchData, fetchLoading, fetchError } = useSelector((state) => state);
  useEffect(() => {
    dispatch(fetchAllData());
  }, []);
  if (fetchLoading) {
    return <h1> Keep Calm, data is still on the way</h1>;
  }
  if (fetchError) {
    return Swal.fire({
      icon: "error",
      text: `${fetchError.message}`,
    });
  }

  function sortByName(event) {
    event.preventDefault();
    dispatch(fetchAllData("name"));
  }
  function sortByGender(event) {
    event.preventDefault();
    dispatch(fetchAllData("gender"));
  }
  function sortByAddress(event) {
    event.preventDefault();
    dispatch(fetchAllData("address"));
  }
  function updateFormClick(event, id) {
    event.preventDefault();
    navigate("/update", {
      state: id,
    });
  }
  return (
    <>
      <h1>Data User</h1>
      <div id="container">
        <button onClick={sortByName}>sort by Name</button>{" "}
        <button onClick={sortByGender}>sort by Gender</button>{" "}
        <button onClick={sortByAddress}>sort by Address</button>
      </div>

      <table>
        <tr>
          <th>name</th>
          <th>Gender</th>
          <th>address</th>
          <th>Action</th>
        </tr>
        {fetchData?.map((el) => {
          return (
            <>
              <tr>
                <td>
                  {el.lastName} {el.firstName}
                </td>
                <td>{el.gender}</td>
                <td>
                  {el.addr?.map((address) => {
                    return (
                      <>
                        {address.street} {address.house}, {address.city}{" "}
                        {address.country}{" "}
                      </>
                    );
                  })}
                </td>
                <td>
                  <button onClick={(event) => updateFormClick(event, el._id)}>
                    update
                  </button>
                </td>
              </tr>
            </>
          );
        })}
      </table>
    </>
  );
}
export default Home;
