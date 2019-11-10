const apiKey = 'YVLuJPKk1la2pzEjft5QKao8_hbkNBsKyUOWwf4Yc94M19gEtcHLnoXhrym_' +
    'lLgDXOcenMhfDAaXHb7THinNuZK6PJyI6tjhx6NLQPnAvWv82q339SZ4cWooeYvHXXYx';

const Yelp = {
    search: function(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?` +
            `term=${term}&location=${location}&sort_by=${sortBy}`, {
                headers: {
                    Authorization: `Bearer ${apiKey}`
                }
            })
            .then(response => {
                return response.json();
            })
            .then(jsonResponse => {
                if (jsonResponse.businesses) {
                    return jsonResponse.businesses.map(business => {
                        let categoryArr = [];

                        business.categories.forEach(category => {
                            categoryArr.push(category.title);
                        });

                        return {     
                            id: business.id,
                            imageSrc: business.image_url,
                            name: business.name,
                            address: business.location.display_address,
                            city: business.location.city,
                            state: business.location.state,
                            zipCode: business.location.zip_code,
                            category: categoryArr.join(', '),
                            rating: business.rating,
                            reviewCount: business.review_count
                        }
                    });
                }
            });
    }
};

export default Yelp;
