import requests
import json
from streamlit_lottie import st_lottie
from unicodedata import name
import numpy as np
import pandas as pd
import streamlit as st
import plotly.graph_objs as go
import chart_studio.plotly as py
from plotly.offline import init_notebook_mode, iplot
from countryinfo import CountryInfo
import pycountry
import plotly.express as px
import plotly.graph_objects as go

@st.cache_data
def Pageviews():
    return []


# animations--------------------------------------------------------------------------------------
def load_lottiefile(filepath: str):
    with open(filepath, "r") as f:
        return json.load(f)


def load_lottieurl(url: str):
    r = requests.get(url)
    if r.status_code != 200:
        return None
    return r.json()


# dataset import-----------------------------------------------------------------------------


@st.cache_data
def import_dataset_one():
    return pd.read_csv("twitter.csv")
def import_dataset_two():
    return pd.read_csv("social1.csv")
twitter_country_df = import_dataset_one()
data = import_dataset_two()
data.rename(columns={"Tiktoker name" : "User name" , "Tiktok name" : "Twitter name" , "Subscribers" : "Followers"}, inplace=True)
country_name = ["Select Country" ,'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
                'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba',
                'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
                'Bangladesh', 'Barbados', 'Belarus', 'Belgium',
                'Belgium-Luxembourg', 'Belize', 'Benin', 'Bermuda', 'Bhutan',
                'Bolivia (Plurinational State of)', 'Bosnia Herzegovina',
                'Botswana', 'Brazil', 'Brunei Darussalam', 'Bulgaria',
                'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon',
                'Canada', 'Central African Rep.', 'Chad', 'Chile', 'China',
                'China, Hong Kong SAR', 'China, Macao SAR', 'Colombia', 'Comoros',
                'Congo', 'Cook Isds', 'Costa Rica', "Côte d'Ivoire", 'Croatia',
                'Cuba', 'Cyprus', 'Czech Rep.', 'Denmark', 'Djibouti', 'Dominica',
                'Dominican Rep.', 'Ecuador', 'Egypt', 'El Salvador', 'Eritrea',
                'Estonia', 'Ethiopia', 'EU-28', 'Faeroe Isds', 'Fiji', 'Finland',
                'Fmr Fed. Rep. of Germany', 'Fmr Sudan', 'France', 'French Guiana',
                'French Polynesia', 'FS Micronesia', 'Gabon', 'Gambia', 'Georgia',
                'Germany', 'Ghana', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe',
                'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti',
                'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
                'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan',
                'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan',
                "Lao People's Dem. Rep.", 'Latvia', 'Lebanon', 'Lesotho', 'Libya',
                'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
                'Maldives', 'Mali', 'Malta', 'Martinique', 'Mauritania',
                'Mauritius', 'Mayotte', 'Mexico', 'Mongolia', 'Montenegro',
                'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia',
                'Nepal', 'Neth. Antilles', 'Netherlands', 'New Caledonia',
                'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman',
                'Other Asia, nes', 'Pakistan', 'Palau', 'Panama',
                'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland',
                'Portugal', 'Qatar', 'Rep. of Korea', 'Rep. of Moldova', 'Réunion',
                'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevis',
                'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa',
                'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia',
                'Serbia and Montenegro', 'Seychelles', 'Sierra Leone', 'Singapore',
                'Slovakia', 'Slovenia', 'So. African Customs Union',
                'Solomon Isds', 'South Africa', 'Spain', 'Sri Lanka',
                'State of Palestine', 'Sudan', 'Suriname', 'Swaziland', 'Sweden',
                'Switzerland', 'Syria', 'TFYR of Macedonia', 'Thailand',
                'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia',
                'Turkey', 'Turkmenistan', 'Turks and Caicos Isds', 'Uganda',
                'Ukraine', 'United Arab Emirates', 'United Kingdom',
                'United Rep. of Tanzania', 'Uruguay', 'USA', 'Vanuatu',
                'Venezuela', 'Viet Nam', 'Wallis and Futuna Isds', 'Yemen',
                'Zambia', 'Zimbabwe', 'Tuvalu', 'Cayman Isds', 'Tajikistan']
country_lst_two = ["Select Country" ,'India', 'United States', 'Indonesia', 'Brazil', 'Philippines',
       'Mexico', 'Vietnam', 'Thailand', 'Japan', 'Pakistan', 'Egypt',
       'Bangladesh', 'Turkey', 'United Kingdom', 'Iran', 'France',
       'Germany', 'Italy', 'Nigeria', 'Argentina', 'Colombia', 'Malaysia',
       'Spain', 'Saudi Arabia', 'South Korea', 'Iraq', 'Algeria',
       'South Africa', 'Canada', 'Morocco', 'Taiwan', 'Myanmar', 'Peru',
       'Poland', 'Australia', 'Russia', 'Nepal', 'Venezuela', 'Chile',
       'Cambodia', 'Kazakhstan', 'Netherlands', 'Romania', 'Kenya',
       'United Arab Emirates', 'Ecuador', 'Ukraine', 'Sweden', 'Syria',
       'Tunisia', 'Sri Lanka', 'Ghana', 'Portugal', 'Guatemala',
       'Ethiopia', 'Belgium', 'Jordan', 'Israel', 'Hong Kong', 'Bolivia',
       'Hungary', 'Greece', 'Ivory Coast', 'Libya', 'Tanzania',
       'Dominican Republic', 'Austria', 'Singapore', 'Czech Republic',
       'Uzbekistan', 'Azerbaijan', 'Cameroon', 'Kuwait', 'Lebanon',
       'Denmark', 'China', 'Bulgaria', 'Belarus', 'Laos', 'Senegal',
       'Dr Congo', 'Switzerland', 'New Zealand', 'Honduras', 'Serbia',
       'El Salvador', 'Norway', 'Yemen', 'Uganda', 'Paraguay', 'Georgia',
       'Ireland', 'Finland', 'Costa Rica', 'Palestine', 'Oman', 'Qatar',
       'Madagascar', 'Angola', 'Mozambique', 'Mongolia', 'Slovakia',
       'Zambia', 'Nicaragua', 'Uruguay', 'Puerto Rico', 'Somalia',
       'Croatia', 'Mali', 'Panama', 'Burkina Faso', 'Guinea', 'Armenia',
       'Haiti', 'Albania', 'Benin', 'Bahrain', 'Lithuania', 'Zimbabwe',
       'Sudan', 'Botswana', 'Tajikistan', 'Jamaica', 'Slovenia',
       'North Macedonia', 'Cyprus', 'Mauritania', 'Mauritius', 'Togo',
       'Sierra Leone', 'Republic Of The Congo', 'Gabon', 'Rwanda',
       'Moldova', 'Namibia', 'Estonia', 'Latvia', 'Trinidad And Tobago',
       'Burundi', 'Liberia', 'Malawi', 'Fiji', 'Reunion', 'Niger',
       'Bhutan', 'Lesotho', 'Brunei', 'Chad', 'Timor Leste',
       'South Sudan', 'Macau', 'Gambia', 'Maldives', 'Malta',
       'Luxembourg', 'Guyana', 'Eswatini', 'Montenegro', 'Suriname',
       'Djibouti', 'Iceland', 'Turkmenistan', 'Bahamas', 'Guadeloupe',
       'French Polynesia', 'Belize', 'Comoros', 'New Caledonia',
       'Martinique', 'Barbados', 'Guam', 'Guinea Bissau',
       'Central African Republic', 'Samoa', 'Solomon Islands',
       'Equatorial Guinea', 'Curacao', 'Vanuatu', 'French Guiana',
       'Mayotte', 'Saint Lucia', 'Aruba', 'Tonga', 'Seychelles', 'Jersey',
       'Grenada', 'Saint Vincent And The Grenadines', 'Andorra',
       'Kiribati', 'Isle Of Man', 'Cayman Islands', 'Micronesia',
       'Dominica', 'Bermuda', 'Greenland', 'Saint Kitts And Nevis',
       'Guernsey', 'Northern Mariana Islands', 'Faroe Islands',
       'American Samoa', 'Sint Maarten', 'Western Sahara',
       'Turks And Caicos Islands', 'Marshall Islands', 'Gibraltar',
       'United States Virgin Islands', 'Saint Martin', 'North Korea',
       'Liechtenstein', 'Palau', 'Monaco', 'British Virgin Islands',
       'Anguilla', 'San Marino', 'Tuvalu', 'Saint Barthelemy', 'Eritrea',
       'Wallis And Futuna', 'Saint Pierre And Miquelon',
       'Falkland Islands', 'Nauru', 'Cook Islands', 'Montserrat', 'Niue',
       'Vatican City', 'Tokelau']
# Twitter dataset import-----------------------------------------------------------------------------


# Front Page Input-----------------------------------------------------------------------------------
service_input = st.selectbox("Select Services", ["", "Social Media Analysis"])
# Front Page Input-----------------------------------------------------------------------------------

#Usage Functions
def change_data_type_to_float(data , column):
    data[column] = data[column].str.replace(',', '')
    data[column] = data[column].astype('float64')

def conver_user_number(value):
    new_value = pd.to_numeric(value.replace('K','').replace('M',''))
    multiplier = 1_000_00 if 'M' in value else  1_000 if 'K' in value else 1
    return float(multiplier * new_value)

# Front Page Input input check-----------------------------------------------------------------------------
if service_input == "Social Media Analysis":
    choice_radio = st.sidebar.radio("What Are You Willing To See", [
                                    "Data Visualisation", "About Country"])
    if (choice_radio == "Data Visualisation"):
        #Animation
        lottie_hello = load_lottieurl(
            "https://assets6.lottiefiles.com/packages/lf20_dyimsq5i.json")
        st_lottie(
            lottie_hello,
            speed=1,
            reverse=False,
            loop=True,
            quality="high",  # medium ; high
            height=400,
            width=None,
            key="1",
        )

        st.title("Dataset used ")
        twitter_country_df.rename(columns={'Facebook_Users%': 'Twitter_Users%'}, inplace=True)
        st.dataframe(twitter_country_df , width=1000)
        st.text("This dataset is the collection of twitter users from different countries.\nThe data set contains five columns of data ")
        st.code('Name , Users , Twitter_Users% , Date_Of_Data , Population')
        st.subheader("Attributes datatype")
        st.code(twitter_country_df.dtypes)
        st.subheader("There are no null values in the dataset")
        st.code(twitter_country_df.isnull().sum())
        twitter_country_df.drop("Date_of_Data" , axis = 1 , inplace = True)
        change_data_type_to_float(twitter_country_df , "Population") 
        twitter_country_df["Users"] = twitter_country_df["Users"].apply(conver_user_number)
        twitter_country_df["Twitter_Users%"] = twitter_country_df["Twitter_Users%"].str.replace('%','').astype('float64').round(2)
        #Top 10 Countries with most users
        st.subheader("Top 10 Countries With Most Active Users")
        top_10_most_users_coutry = px.bar(
            twitter_country_df.head(10) ,
            x="Name",
            y="Users",
            color= "Name", #Used for the purpose of legends
            color_discrete_sequence=px.colors.sequential.Aggrnyl,
            labels={
            'Name' : "Country Name" , 
            "Users" : "Number Of Users"
            }
        )
        top_10_most_users_coutry

        # Top 10 Countries with least users
        st.subheader("Top 10 Countries With Least Active Users")
        top_10_countries_with_least_users = px.bar(
            twitter_country_df.sort_values(by="Users").head(10) ,
            x="Name",
            y="Users",
            color= "Name", #Used for the purpose of legends
            color_discrete_sequence=px.colors.sequential.Emrld,
            labels={
            'Name' : "Country Name" , 
            "Users" : "Number Of Users"
            }
        )
        top_10_countries_with_least_users

        #Populatioon and Number of Users Relationship of Top 10 Most Users
        st.subheader("Relationship Between Population and Number Of Users Of The Top 10 Countries")
        population_and_number_of_user_relatn = px.bar(
            twitter_country_df.head(20) ,
            x="Name",
            y=["Population" , "Users"],
            color_discrete_sequence=px.colors.sequential.Aggrnyl,
            labels={
            'Name' : "Country Name" , 
            "Users" : "Number Of Users"
            }
        )
        population_and_number_of_user_relatn
        st.subheader("Twitter Userse by country")
        fig1 = px.choropleth(twitter_country_df, locationmode="country names" , locations="Name",
                    color="Users", # lifeExp is a column of gapminder
                    hover_name="Name", # column to add to hover information
                    color_continuous_scale=px.colors.sequential.Plasma ,
                            range_color=(0, max(twitter_country_df['Users'])))
        st.plotly_chart(fig1)
        st.subheader("% of Population using Twitter")
        fig2 = px.choropleth(twitter_country_df, locations="Name", locationmode="country names", color="Twitter_Users%",
                    color_continuous_scale="YlOrRd",
                    range_color=(0, max(twitter_country_df['Twitter_Users%'])))
        st.plotly_chart(fig2)


        st.title("Comparison Between Two Countries")
        col1, col2 = st.columns(2)
        country_input_one = ""
        country_input_two = ""
        with col1:
            country_input_one = st.selectbox(
            "Select First Country", country_lst_two , key="avcasdv")
        with col2:
             country_input_two = st.selectbox(
            "Select Second Country", country_lst_two , key="vcasvas")
        if(country_input_one !="Select Country" and country_input_two !="Select Country"):
            st.subheader(f"Users comparison between {country_input_one} & {country_input_two}")
            data_one = twitter_country_df[(twitter_country_df.Name == country_input_one) | (twitter_country_df.Name == country_input_two)]
            dum1 = px.bar(
                data_one ,
                x="Name",
                y=["Population" , "Users"],
                color_discrete_sequence=px.colors.sequential.Emrld,
                labels = {
                "Name" : f"{country_input_one} & {country_input_two}",
                "value" : "Total Population by Number of Users"
                }
            )
            st.plotly_chart(dum1)
            st.subheader(f"Percentage of active users in the Country")
            dum1 = px.bar(
                data_one ,
                x="Name",
                y="Twitter_Users%",
                color_discrete_sequence=px.colors.sequential.Aggrnyl,
                labels = {
                "Name" : f"{country_input_one} & {country_input_two}",
                "Facebook_Users%" : "Users in percentage"
                }
            )
            dum1

  
        zip_data = zip(data["Followers"] , data["Views avg."] ,data["Likes avg."] ,data["Comments avg."] , data["Shares avg."] )  
        Follower_Count = []
        View_Avg = []
        Likes_Avg = []
        Comments_Avg = []
        Shares_Avg = []
        for Followers , Views , Likes , Comments  , Shares in zip_data:
        #Followers
            if 'K' in Followers:
                Follower_Update = Followers.strip('K')
                Follower_Update = float(Follower_Update) * 1000
                Follower_Count.append(round(Follower_Update))
            if 'M' in Followers:
                Follower_Update = Followers.strip('M')
                Follower_Update = float(Follower_Update) * 1000000
                Follower_Count.append(round(Follower_Update))
            #Views
            if 'K' in Views:
                Views_Update = Views.strip('K')
                Views_Update = float(Views_Update) * 1000
                View_Avg.append(round(Views_Update))
            if 'M' in Views:
                Views_Update = Views.strip('M')
                Views_Update = float(Views_Update) * 1000000
                View_Avg.append(round(Views_Update))
            #Likes
            if 'K' in Likes:
                Likes_Update = Likes.strip('K')
                Likes_Update = float(Likes_Update) * 1000
                Likes_Avg.append(round(Likes_Update))
            if 'M' in Likes:
                Likes_Update = Likes.strip('M')
                Likes_Update = float(Likes_Update) * 1000000
                Likes_Avg.append(round(Likes_Update))
            #Comments
            if 'K' in Comments:
                Comments_Update = Comments.strip('K')
                Comments_Update = float(Comments_Update) * 1000
                Comments_Avg.append(round(Comments_Update))
            elif 'M' in Comments:
                Comments_Update = Comments.strip('M')
                Comments_Update = float(Comments_Update) * 1000000
                Comments_Avg.append(round(Comments_Update))
            else:
                Comments_Avg.append(round(float(Comments)))
            #Shares
            if 'K' in Shares:
                Shares_Update = Shares.strip('K')
                Shares_Update = float(Shares_Update) * 1000
                Shares_Avg.append(round(Shares_Update))
            elif 'M' in Shares: 
                Shares_Update = Shares.strip('M')
                Shares_Update = float(Shares_Update) * 1000000
                Shares_Avg.append(round(Shares_Update))
            else:
                Shares_Avg.append(round(float(Shares)))
        data["Followers"] = Follower_Count
        data["Views avg."] = View_Avg
        data["Likes avg."] = Likes_Avg
        data["Comments avg."] = Comments_Avg
        data["Shares avg."] = Shares_Avg
        data.rename(columns={ "Views avg." : "Views",
            "Likes avg." : "Likes",
            "Comments avg." : "Comments",
            "Shares avg." : "Shares"}, inplace=True)
        st.title("Engagement Analysis")
        st.dataframe(data)
        st.subheader("Most Followed Twitter User")
        d1 = px.histogram(
            data.sort_values(by = "Followers").head(10),
            y = "User name" ,
            x = "Followers",
            text_auto=True,
            color_discrete_sequence=['indianred'],
            labels= {
            "Twitter name" : "Twitter User Name" ,
            "Followers" : "Followers Count"
            }
        )
        st.plotly_chart(d1)
        st.subheader("Top Most Viewed Twitter User")
        d2 = px.histogram(
            data.sort_values(by = "Views").head(10) , 
            x = "Views" , 
            y = "User name" ,
            color_discrete_sequence=px.colors.qualitative.Set2,
            text_auto=True,
        )
        st.plotly_chart(d2)
        st.subheader("Top Most Liked Twitter User")
        d3 = px.histogram(
            data.sort_values(by = "Likes").head(10) , 
            x = "Likes" , 
            y = "User name" ,
            color_discrete_sequence=px.colors.qualitative.Plotly,
            text_auto=True,
        )
        st.plotly_chart(d3)
        st.subheader('Correlation Heatmap')
        data.drop( columns=["S.no"] , inplace=True)
        d5 = px.imshow(round(data.corr(),1),text_auto=True)
        st.plotly_chart(d5)

    elif (choice_radio == "About Country"):
        country_input = st.sidebar.selectbox(
            "Select a Country", country_name)
        if (country_input != "Select Country"):
            st.title(f"About {country_input}")
            st.text("")
            st.text("")
            st.text("")
            country = CountryInfo(country_input)
            with st.expander(f"{country_input}'s Area"):
                st.write(country.info()["area"])
            with st.expander(f"{country_input}'s Neighbouring Countries"):
                for i in range(0, len(country.info()["borders"])):
                    converted_name = pycountry.countries.get(
                        alpha_3=country.info()["borders"][i]).name
                    st.write(f"{i+1} : {converted_name}")
            with st.expander(f"{country_input}'s capital"):
                capital = country.info()["capital"]
                st.write(capital)
            with st.expander(f"{capital}'s  Location"):
                df = pd.DataFrame(pd.Series({"lat": country.info()[
                    "capital_latlng"][0], "lon": country.info()["capital_latlng"][1]})).T
                st.map(df, zoom=5)
            with st.expander(f"{country_input}'s  Location"):
                df = pd.DataFrame(pd.Series(
                    {"lat": country.info()["latlng"][0], "lon": country.info()["latlng"][1]})).T
                st.map(df, zoom=3)
            with st.expander(f"{country_input}'s Currency"):
                st.write(country.info()["currencies"][0])

            with st.expander(f"{country_input}'s population"):
                st.write(country.info()["population"])

            with st.expander(f"{country_input}'s Provinces"):
                for i in range(0, len(country.info()["provinces"])):
                    name = country.info()["provinces"][i]
                    st.write(f"{i+1} : {name}")
            with st.expander(f"Region"):
                st.write(country.info()["region"])

            with st.expander(f"Timezone"):
                st.write(country.info()["timezones"][0])
        else:
            st.title("👈Please Select A Country")
    else:
        st.title("👈Please Select A Country")
else:
    st.title("Data Analysis Tool for Qwik-X")
    st.write("Brief Explaination About Project :")
    col1, col2 = st.columns(2)
    with col1:
        st.text("This is a dahboard for analyzing the full\nstack Qwik-X platform that i've build \nusing React , Node js , Tailwind Css.\nIt is important inorder to get insights\nand increase business revenues.")
        st.text("This is a dahboard for analyzing the full\nstack Qwik-X platform that i've build \nusing React , Node js , Tailwind Css.\nIt is important inorder to get insights\nand increase business revenues.")
    with col2:
        # Front page Animation<Start>------------------------------------------------------------------------
        lottie_hello = load_lottieurl(
            "https://assets7.lottiefiles.com/packages/lf20_yzomh7id.json")
        st_lottie(
            lottie_hello,
            speed=1,
            reverse=False,
            loop=True,
            quality="high",  # medium ; high
            height=None,
            width=None,
            key="1",
        )

    @st.cache_data
    def Pageviews():
        return []
    pageviews = []
    pageviews.append('dummy')
    pg_views = len(pageviews)
    # Front page Animation<End>------------------------------------------------------------------------
# Front Page Input input check-----------------------------------------------------------------------------