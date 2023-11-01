import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Ground = () => {
    const params = useParams();
    const [ground, setGround] = useState({});
    const [error, setError] = useState(false);

    console.log(ground);

    useEffect( () => {
        const fetchGround = async () => {
            const groundId = params.groundId;

            const res = await fetch(`/api/ground/grounds/${groundId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            if (data.success == false) {
                setError(data.message);
                return;
            }

            console.log(data);
            setGround(data);
        };

        fetchGround();
    }, []);

  return (
    <div>Ground</div>
  )
}

export default Ground