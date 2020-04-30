export class Spotify {
    constructor() {
        this.token = ''
        this.tokenExpiration = 0
    }

    async fetchToken() {
        const token = await fetchToken({
            grant_type: 'client_credentials',
        })
        this.token = token.access_token
        this.tokenExpiration = Date.now() + token.expires_in * 1000
        return this.token
    }

    authorize = (req, res) => {
        const scopes = 'user-read-private user-read-email'
        res.status(STATUS.OK).send(
            Response(
                USER_AUTH_URL +
                    '?response_type=code' +
                    '&client_id=' +
                    CLIENT_TOKEN +
                    '&scope=' +
                    encodeURIComponent(scopes) +
                    '&redirect_uri=' +
                    encodeURIComponent(
                        REDIRECT_URL, //${req.session.id}`,
                    ),
            ),
        )
    }

    requestToken = async (req, res) => {
        const token = await fetchToken({
            grant_type: 'authorization_code',
            code: req.query.code,
            redirect_uri: REDIRECT_URL,
        })
    }

    refreshToken = async (req, res) => {
        const token = await fetchToken({
            grant_type: 'refresh_token',
            refreshToken: req.query.token,
        })
    }

    search = async (req, res) => {
        let query = req.query

        query = query.query.replace(' ', '%')

        try {
            const searchResults = await axios({
                medthod: 'GET',
                url: `${SEARCH_URL}?q=${query}&type=track`,
                headers: {
                    Authorization: `Bearer ${req.token}`,
                },
            })

            const tracks = searchResults.data.tracks.items.map(t =>
                extractTrackInformation(t),
            )
        }
    }

    getTrackDetails = async (req, res) => {
        const { trackID, sessionID } = req.query
        const track = await axios({
            medthod: 'GET',
            url: `${TRACK_URL}/${trackID}`,
            headers: {
                Authorization: `Bearer ${req.token}`,
            },
        }).then(res => extractTrackInformation(res.data))
    }
}
