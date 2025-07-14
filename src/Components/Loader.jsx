// Loader.jsx
// This component displays a Bootstrap spinner.
// It is created as a separate component to keep our code modular and reusable.

const Loader = () => {
    return (
        <div className="d-flex justify-content-center mt-4">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;
