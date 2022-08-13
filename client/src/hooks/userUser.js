import React from 'react'

const userUser = () => {
    return {
        id: document.cookie.match(/userId=(?<id>[^;]+);?$/).groups.id
    }
}

export default userUser