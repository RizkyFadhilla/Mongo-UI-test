import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllData } from "../stores/actions/userAction";
import Swal from "sweetalert2";
import "./Home.css";
import { useState } from "react";

function Home() {
  const dispatch = useDispatch();
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
  return (
    <>
      <h1>Testing</h1>
      <span>
        <button onClick={sortByName}>sort by Name</button>{" "}
        <button onClick={sortByGender}>sort by Gender</button>
        <button onClick={sortByAddress}>sort by Address</button>
      </span>
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
                  {el.lastName} {el.firstname}
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
                  <button>update</button>
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
