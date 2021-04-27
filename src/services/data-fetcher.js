

export const setupAndFetch = async () => {
    if(window.location.hostname === 'localhost') this.API_URL =  "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();

    await this.getConfig();
    this.getActivities();
}

export const getConfig = () => {
    try{
      const request = await fetch('/config');
      const data = await request.json();
      request.status === 200 && this.setState({activitiesDate: data.activitiesDate});

    } catch(e) {
      console.error('ERROR: cannot get the url config: ', e);
    }
}

export const getActivities = async (startDate = this.state.activitiesDate, endDate) => {
    this.setState({showLoader: true});
    const user = localStorage.getItem('userId');
    const body = { startDate, endDate };
    let token = getCookie('token').replaceAll('"','');
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    };

    try {
      const request = await fetch(`${this.API_URL}/activities/${user}`, config);
      const response = await request.json();

      return response.result.map(item => ({...item, id: item.activityId}))
    } catch (err) {
      console.error(err);
    }

  }