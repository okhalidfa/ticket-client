export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, {
        method: 'POST',
        body: formData
    });
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.error?.message || 'Image upload to imgbb failed');
    }

    return data.data.url;
};