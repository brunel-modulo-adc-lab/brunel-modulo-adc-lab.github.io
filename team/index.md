---
title: Team
nav:
  order: 6
  tooltip: About our team
---

{% include section.html size="wide" %}

# Team

<div class="team-layout">
<div class="team-members">

<div class="center">
{% include list.html data="members" component="portrait" filter="role == 'reader'" %}
</div>

<div class="center">
{% include list.html data="members" component="portrait" filter="role != 'reader'" %}
</div>

</div>
<figure class="team-wall">
  <img src="{{ "images/team/food-wall.jpg" | relative_url }}" alt="Photo wall of dishes from group dinners" loading="lazy">
  <figcaption>Group dinners.</figcaption>
</figure>
</div>

{% include section.html %}

## Collaborators

- Chongqing University of Posts and Telecommunications, China
- Anhui University, China
- Temple University, USA
