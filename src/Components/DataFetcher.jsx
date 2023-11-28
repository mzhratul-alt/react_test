import { useEffect, useState } from "react";

const DataFetcher = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [postId, setPostId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let API = `https://jsonplaceholder.typicode.com/posts`;
        if (postId !== null) {
            API += `/${postId}`;
        }
        const fetchData = async () => {
            try {
                const response = await fetch(API);
                if (!response.ok) {
                    // Handle 404 error
                    if (response.status === 404) {
                        setError("Post not found!");
                    } else {
                        setError(`Error: ${response.status}`);
                    }
                    setLoading(false);
                    return;
                }
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
                setError(null);
            } catch (error) {
                console.log("Error Fetching Data:", error);
                setError("Error fetching data");
                setLoading(false);
            }
        };
        fetchData();
    }, [postId]);

    const handleSearch = (event) => {
        setPostId(event.target.value);
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mx-auto mt-5">
                        <div className="card mb-5">
                            <input
                                className="form-control"
                                type="search"
                                onKeyUp={handleSearch}
                            />
                        </div>
                        {loading ? (
                            <h1 className="text-center text-warning">
                                Loading....
                            </h1>
                        ) : error ? (
                            <div className="alert alert-danger">{error}</div>
                        ) : data.length > 0 ? (
                            data.map((post, index) => (
                                <div
                                    key={index}
                                    className="card shadow-sm mb-4"
                                >
                                    <div className="card-header">
                                        <h5>{post.title}</h5>
                                    </div>
                                    <div className="card-body">{post.body}</div>
                                </div>
                            ))
                        ) : (
                            <div className="card shadow-sm mb-4">
                                <div className="card-header">
                                    <h5>{data.title}</h5>
                                </div>
                                <div className="card-body">{data.body}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DataFetcher;
