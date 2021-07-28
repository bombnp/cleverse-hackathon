import React from 'react'

export const HospitelImage = (props: any) => {
    return (
        props.images.map((image: any, i: number) => (
            <div key={i} className='fadein'>
                <div
                    onClick={() => props.removeImage(image.public_id)}
                    className='delete'
                >
                    <div>Delete</div>
                </div>
                <img src={image.secure_url} alt="" />
            </div>
        ))
    );
}

