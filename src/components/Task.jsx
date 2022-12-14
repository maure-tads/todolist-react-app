

function Task({titulo, id}) {
    return (
        <div className="m-3 shadow bg-white rounded d-flex align-items-center p-3" style={{height: "65px", width:"50vw"}}>
            {titulo}
        </div>
    )

}

export default Task