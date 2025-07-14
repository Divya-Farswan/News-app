import image from '../assets/image.jpg'
const NewsItem = ({ title, description, url, src }) => {
  return (
    <div >
      <div className="card h-100 bg-dark text-light" style={{ border: "10px solid rgb(67, 71, 75)", borderRadius: "5px" }} >
        <img src={src || image} onError={(e) => {
          e.target.onError = null;
          e.target.src = image;
        }}
        className="card-img-top img-fluid" style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: 0, borderTopRightRadius: 0 }} alt={title || "news image"} />
        <div className="card-body p-2 ">
          <h5 className="card-title custom-text">{title}</h5>
          <p className="card-text  custom-text">{description ? description : "Stay informed with our comprehensive coverage of the latest events from around the world. Our news delivers in-depth analysis, timely updates, and unbiased reporting to keep you ahead of the curve.".slice(0, 60)}</p>
          <a href={url} className="btn btn-light fw-semibold">Read More</a>
        </div>
      </div>
    </div>
  );
}
export default NewsItem;
