---
title: Team
nav:
  order: 6
  tooltip: About our team
---

# {% include icon.html icon="fa-solid fa-users" %}Team

<div class="center">
{% include list.html data="members" component="portrait" filter="role == 'reader'" %}
</div>

<div class="center">
{% include list.html data="members" component="portrait" filter="role != 'reader'" %}
</div>

{% include section.html %}

## Collaborators

- Chongqing University of Posts and Telecommunications, China
- Anhui University, China
- Temple University, USA
