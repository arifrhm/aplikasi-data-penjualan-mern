
const SelectOptions = () => {
    return (
    <label className="form-control w-full max-w-xs px-2">
        <div className="label">
            <span className="label-text">Select Label</span>
        </div>
        <select className="select select-bordered input input-bordered w-full max-w-xs">
            <option disabled selected>Pick one</option>
            <option>Star Wars</option>
            <option>Harry Potter</option>
            <option>Lord of the Rings</option>
            <option>Planet of the Apes</option>
            <option>Star Trek</option>
        </select> 
    </label>)
}
export default SelectOptions;