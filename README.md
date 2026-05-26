# TaxiMeter

Visual specs and a phone-app prototype for a touch-first taxi meter UI.

## Phone app prototype

Open `prototype/index.html` in a browser (or serve the folder locally):

```bash
cd prototype && python3 -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

The prototype follows `taxi_meter_phone_app_view_spec.md`: dark portrait canvas, `주행중` banner, live-rendered meter values (horse, `0%`, fare, countdown, etc.) placed directly on the screen, and a 2×2 control grid (`빈차`, `주행 (시외)`, `할증`, `지불`). While in driving mode, the magenta countdown starts at `2000`, decreases, increases the fare at `0`, and resets.
