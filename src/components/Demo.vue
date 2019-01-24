<template>
    <div id="app">
        <slideshow :images="images" :collagesSizeFrom="2" :collagesSizeTo="5" :slidesInterval="4000"></slideshow>
    </div>
</template>

<script type="text/ecmascript-6">
    import Slideshow from "../App.vue";

    export default {
        name: 'Demo',
        components: {
            Slideshow
        },
        data() {
            return {
                images: [
                    {image: "https://wallpapershome.com/images/pages/pic_v/5111.jpg"},
                    {image: "https://thumbor.forbes.com/thumbor/1280x868/https%3A%2F%2Fblogs-images.forbes.com%2Fannabel%2Ffiles%2F2018%2F02%2FLouisville_Skyline-1200x801.jpg"},
                    {image: "https://t-ec.bstatic.com/images/hotel/max1024x768/683/68345284.jpg"},
                    {image: "https://i.pinimg.com/originals/08/ec/94/08ec94ecf38048a2102ec4783dc88fa8.jpg"},
                    {image: "https://t-ec.bstatic.com/images/hotel/max1024x768/873/87316855.jpg"},
                    {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eiffel_Tower_Vertical.JPG/802px-Eiffel_Tower_Vertical.JPG"},
                    {image: "http://nexusandme.com/wp-content/uploads/2014/06/Ferris-Wheel.jpg"},
                    {image: "http://unmaskmycity.org/wp-content/uploads/2017/01/cityneighborhood.jpg"},
                    {image: "https://wallpapershome.com/images/pages/pic_v/660.jpg"},
                    {image: "http://www.manager.bg/sites/default/files/mainimages/20aa_29.jpg"},
                    {image: "https://www.squaremeal.co.uk/~/media/hero/area/city.jpg?useCustomFunctions=1&centerCrop=1"},
                    {image: "https://images.wallpaperscraft.com/image/road_marking_bridge_123398_1920x1080.jpg"},
                    {image: "https://stmed.net/sites/default/files/cities-wallpapers-28512-590093.jpg"},
                    {image: "https://img4.goodfon.com/wallpaper/nbig/b/d1/skyscrapers-building-architecture-vertical-night-lights-city.jpg"},
                    {image: "https://images.wallpaperscraft.com/image/architecture_city_view_from_above_buildings_river_118446_1920x1080.jpg"},
                    {image: "https://images.unsplash.com/photo-1534856966153-c86d43d53fe0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
                    {image: "https://images.wallpaperscraft.com/image/architecture_city_beautiful_building_sky_59431_1920x1080.jpg"},
                    {image: "https://images.unsplash.com/photo-1541780815498-ffd0f2d0d0af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
                    {image: "https://images.unsplash.com/photo-1536235799634-c6c21fdc2b9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
                    {image: "https://data.whicdn.com/images/126024359/large.jpg"},
                    {image: "https://images.wallpaperscraft.com/image/bridge_night_city_lighting_125945_1280x720.jpg"},
                    {image: "https://images.unsplash.com/photo-1501464915526-070295e4768d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
                    {image: "https://images.wallpaperscraft.com/image/architecture_building_sky_114682_1920x1080.jpg"},
                    {image: "https://images.wallpaperscraft.com/image/bridge_night_city_tokyo_120902_1280x720.jpg"},
                    {image: "https://images.wallpaperscraft.com/image/trolley_urban_landscape_san_diego_california_usa_50544_1280x720.jpg"},
                    {image: "https://images.unsplash.com/photo-1541780050666-f64773a3d779?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
                    {image: "https://images.wallpaperscraft.com/image/bridge_night_city_bay_124832_1280x720.jpg"},
                    {image: "https://images.unsplash.com/photo-1519359810479-37e924ddd0b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
                    {image: "https://images.unsplash.com/photo-1531149209156-122dcea6fdd2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
                    {image: "https://images.unsplash.com/photo-1531496397966-75128d275fe5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
                    {image: "https://images.wallpaperscraft.com/image/bridge_night_city_city_lights_132392_1280x720.jpg"},
                    {image: "https://images.unsplash.com/photo-1519895663930-861efd5fd07f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
                    {image: "https://images.wallpaperscraft.com/image/trolley_stop_city_evening_lighting_119292_1280x720.jpg"},
                    {image: "https://images.wallpaperscraft.com/image/urban_landscape_night_lights_san_francisco_california_usa_hdr_54872_1280x720.jpg"},
                    {image: "https://images.unsplash.com/photo-1529668359626-876c212a4ba7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
                    {image: "https://images.unsplash.com/photo-1533579494325-7a7ad78b6645?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
                    {image: "https://images.unsplash.com/photo-1531932594968-e5e5e9dee95a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
                    {image: "https://images.wallpaperscraft.com/image/san_francisco_night_bridge_lights_hdr_58444_1280x720.jpg"},
                    {image: "https://images.unsplash.com/photo-1467217440414-bf182fc492d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},

                ]
            }
        },
    }
</script>
