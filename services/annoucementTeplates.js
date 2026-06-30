module.exports = {

    updating(product) {

        return {

            title: `🟡 ${product.shortName} - Updating`,

            body: [

                "A game update has been detected.",

                "Our developers are actively working on the product.",

                "We'll announce when service is restored."

            ]

        };

    },

    operational(product) {

        return {

            title: `🟢 ${product.shortName} - Updated`,

            body: [

                `${product.shortName} has been successfully updated to the latest version.`,

                "Downtime has been compensated.",

                "Enjoy!"

            ]

        };

    }

};